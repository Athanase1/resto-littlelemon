import { createContext, useState } from "react";
import axios from "axios";

export const ReservationContext = createContext({
  reserver: () => {},
  reservations: () => {},
  reserves: null,
});

export default function ReserVationProvider({ children }) {
  const [reserves, setReserves] = useState(null);

  const reserver = async (
    date,
    nbPersonnes,
    occasion,
    heure,
    nom,
    prenom,
    tel,
    email
  ) => {
    try {
      const res = await axios.post(
        "https://project1-backend-2gj1.onrender.com/api/users/reservation",
        { date, nbPersonnes, occasion, heure, nom, prenom, tel, email },
        { withCredentials: true }
      );

      const { reservation, detail, message } = res.data;
      return { success: true, reservation, detail, message };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Erreur inconnue lors de la réservation.",
      };
    }
  };

const reservations = async (tel) => {
  try {
    const res = await axios.get("https://project1-backend-2gj1.onrender.com/api/users/reservations", {
      params: { tel },
      withCredentials: true,
    });

    const { reservations } = res.data;
    setReserves(reservations);
    return {
      success: true,
      message: res.data.message,
      data: reservations, // ✅ on renvoie directement les réservations ici
    };
  } catch (e) {
    return {
      success: false,
      message: e.response?.data?.message || e.message || "Erreur inconnue",
    };
  }
};


  const value = {
    reserver:reserver,
    reservations:reservations,
    reserves:reserves,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}
