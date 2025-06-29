import { createContext, useState } from "react";
import axios from "axios";
import LoadingScreen from "../components/layout/Loading";
export const ReservationContext = createContext({
    reserver: () =>{},
    trouverHeures: () =>{}
})
export default function ReserVationProvider  ({children}){
    const reserver = async (date,nbPersonnes,occasion,heure,nom,prenom,tel,email) =>{
   
        try {
           const res = await axios.post(
                "https://project1-backend-2gj1.onrender.com/api/users/reservation",
                {date,nbPersonnes,occasion,heure,nom,prenom,tel,email},
                {withCredentials: true}
            );
            const {reservation, detail,message} = res.data
            return {success: true};

        } catch (error) {
            return {success:false, message: "erreur de serveur ressayez"}
        }
    }
    const trouverHeures = async (date,nbPersonnes) =>{
        try {
            const res = await axios.get("https://project1-backend-2gj1.onrender.com/api/users/reservation",
                {date,nbPersonnes},
                {withCredentials:true}
            );
            return {success : true}
        } catch (error) {
            return {success : false, message: "tout est de notre faute veuillez ressayer"}
        }
    }
    const value = {
        reserver:reserver
    }
   return<ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>
}