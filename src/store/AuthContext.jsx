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
      Deconnexion();
      return null;
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("utilisateur"));
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      setUser(storedUser);
      setToken(accessToken);
    }
    setTimeout(() => setChargement(false), 1000);
  }, []);

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
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
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
            originalRequest.headers["Authorization"] = "Bearer " + newToken;
            return axios(originalRequest);
          } else {
            // ✅ Empêche affichage d’erreur inutile dans console
            return new Promise(() => {}); // ← bloque sans rejet
          }
        }

        return Promise.reject(error); // ← pour erreurs normales
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
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
      const message = error.response?.data?.message || "Information invalide";
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

    const { token, utilisateur } = res.data;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
    setUser(utilisateur);
    setToken(token);
    return { success: true };
  } catch (error) {
    // ✅ On empêche toute erreur d’aller dans la console
    const message =
      error?.response?.data?.message || "Email ou mot de passe incorrect";
    
    // ✅ On retourne un résultat contrôlé sans log de console
    return {
      success: false,
      message,
    };
  }
};


  const Deconnexion = async () => {
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
