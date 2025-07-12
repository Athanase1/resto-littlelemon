import { createContext, useState } from "react";
import axios from "axios";

export const ReservationContext = createContext({
  reserver: () => {},
  reservations: () => {},
  modifier:() =>{},
  supprimerReservation:() =>{},
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
const modifier = async (id, date, nbPersonnes, occasion, heure) => {
  try {
    const res = await axios.put( // ← put est plus approprié que post ici
      "https://project1-backend-2gj1.onrender.com/api/users/reservation/modifier",
      { id, date, nbPersonnes, occasion, heure },
      { withCredentials: true }
    );

    const { reservation, message } = res.data;
    return { success: true, reservation, message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Erreur inconnue lors de la modification.",
    };
    
  }
};

 const supprimerReservation = async (id) => {
  try {
    const res = await axios.delete(
      "https://project1-backend-2gj1.onrender.com/api/users/reservation/suppression",
      {
        data: { id }, // le corps de la requête DELETE
        withCredentials: true,
      }
    );

    return {
      success: true,
      message: res.data.message,
    };
  } catch (e) {
    return {
      success: false,
      message:
        e.response?.data?.message ||
        e.message ||
        "Erreur inconnue lors de la suppression.",
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
    modifier:modifier,
    supprimerReservation:supprimerReservation,
    reserves:reserves,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}
