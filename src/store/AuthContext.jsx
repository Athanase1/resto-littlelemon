import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import LoadingScreen from "../components/layout/Loading";

export const UserContext = createContext({
  user: null,
  token: null,
  connecte: false,
  connexion: () => {},
  Deconnexion: () => {},
  inscriptionEtConnexion: () => {},
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [chargement, setChargement] = useState(true);

  // Fonction pour rafraîchir le token
  const refreshToken = useCallback(async () => {
    try {
      const res = await axios.get("https://project1-backend-2gj1.onrender.com/api/users/refresh", {
        withCredentials: true, // envoie les cookies (refresh token)
      });

      const newToken = res.data.token;
      localStorage.setItem("accessToken", newToken);
      setToken(newToken);

      return newToken;
    } catch (error) {
      console.error("Erreur refresh token :", error);
      Deconnexion();
      return null;
    }
  }, []);

  // On restaure la session au chargement
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("utilisateur"));
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      setUser(storedUser);
      setToken(accessToken);
    }
    setTimeout(() => setChargement(false), 1000); // petit délai optionnel
  }, []);

  // Setup axios interceptor pour gérer le refresh token automatiquement
  useEffect(() => {
    // Ajouter un intercepteur de réponse axios
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const newToken = await refreshToken();
          if (newToken) {
            originalRequest.headers["Authorization"] = "Bearer " + newToken;
            return axios(originalRequest); // relance la requête initiale
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [refreshToken]);

  // Fonctions connexion, inscriptionEtConnexion, Deconnexion (idem, mais update token aussi)

  const inscriptionEtConnexion = async (nom, prenom, email, tel, password) => {
    try {
      const res = await axios.post(
        "https://project1-backend-2gj1.onrender.com/api/users/inscription",
        { nom, prenom, email, tel, password },
        { withCredentials: true }
      );
      const { token, utilisateur } = res.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("utilisateur", JSON.stringify(utilisateur));

      setUser(utilisateur);
      setToken(token);

      if (chargement) return <LoadingScreen text="Inscription en cours" />;
      return { success: true };
    } catch (error) {
      // Extraction du message d'erreur envoyé par le backend
      const message = "Information invalide"
      return { success: false, message };
    }
  };

  const connexion = async (email, password) => {
    try {
      const res = await axios.post(
        "https://project1-backend-2gj1.onrender.com/api/users/connexion",
        { email, password },
        { withCredentials: true }
      );
      const { token, utilisateur} = res.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("utilisateur", JSON.stringify(utilisateur));

      setUser(utilisateur);
      setToken(token);
      return { success: true };
    } catch (error) {
      // Extraction du message d'erreur envoyé par le backend
      return { success: false, message:error.response?.data?.message || "Erreur de connexion"};
    }
  };

  const Deconnexion = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("utilisateur");
    setUser(null);
    setToken(null);
    // Optionnel: appeler une API pour supprimer refresh token côté serveur
  };

  const value = {
    user,
    token,
    connecte: !!token,
    connexion: connexion,
    Deconnexion: Deconnexion,
    inscriptionEtConnexion: inscriptionEtConnexion,
  };
  if (chargement) return <LoadingScreen text="Tentative de connexion" />;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
