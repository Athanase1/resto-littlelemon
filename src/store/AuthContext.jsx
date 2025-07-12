// AuthContext.jsx
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

  const Deconnexion = useCallback(async () => {
    try {
      await axios.post(
        "https://project1-backend-2gj1.onrender.com/api/users/logout",
        null,
        { withCredentials: true }
      );
    } catch {}

    localStorage.removeItem("accessToken");
    localStorage.removeItem("utilisateur");
    setUser(null);
    setToken(null);
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://project1-backend-2gj1.onrender.com/api/users/refresh",
        { withCredentials: true }
      );
      const newToken = res.data.token;
      localStorage.setItem("accessToken", newToken);
      setToken(newToken);
      return newToken;
    } catch {
      await Deconnexion();
      return null;
    }
  }, [Deconnexion]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("utilisateur"));
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      setUser(storedUser);
      setToken(accessToken);
    }

    setTimeout(() => setChargement(false), 500);
  }, []);

  // ⬅️ Intercepteur requête : ajoute le token
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // ⬅️ Intercepteur réponse : tente un refresh si 401
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes("/refresh")
        ) {
          originalRequest._retry = true;
          const newToken = await refreshToken();
          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axios(originalRequest);
          }
        }

        return Promise.reject(error); // laisse les autres erreurs remonter
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshToken]);

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

      return { success: true };
    } catch (error) {
      const message = error?.response?.data?.message || "Information invalide";
      return { success: false, message };
    }
  };

  const connexion = async (email, password) => {
    try {
      const res = await axios.post(
        "https://project1-backend-2gj1.onrender.com/api/users/connexion",
        { email, password },
        {
          withCredentials: true,
          validateStatus: function (status) {
            // Empêche axios de "rejeter" la promesse automatiquement
            return status < 500; // Accepte les 4xx (ex: 401), mais rejette 5xx
          },
        }
      );

      if (res.status === 200) {
        const { token, utilisateur } = res.data;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
        setUser(utilisateur);
        setToken(token);
        return { success: true };
      } else {
        const message = res.data?.message || "Email ou mot de passe incorrect";
        return { success: false, message };
      }
    } catch (error) {
      // Ici seules les erreurs réseau/serveur (ex: 500) arrivent
      return { success: false, message: "Erreur du serveur" };
    }
  };

  const value = {
    user,
    token,
    connecte: !!token,
    connexion,
    Deconnexion,
    inscriptionEtConnexion,
  };

  if (chargement) return <LoadingScreen text="Tentative de connexion" />;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
