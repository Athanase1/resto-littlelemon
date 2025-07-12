import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/AuthContext";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import { useNavigate } from "react-router-dom";
import UserCard from "../card/userCard";
import LoadingScreen from "../layout/Loading";
import "../styles/profile.css";


export default function Profile() {
  const navigate = useNavigate();
  const authCtx = useContext(UserContext);
 
  const [chargement, setChargement] = useState(true);
  const [champs, setChamps] = useState({});
  const [initialChamps, setInitialChamps] = useState(authCtx.user);
  const [clicks, setClicks] = useState({
    nom: true,
    prenom: true,
    email: true,
    tel: true,
  });
  // function pour activer un champs precis
  const activerChamp = (champ) => {
    setClicks({
      nom: true,
      prenom: true,
      email: true,
      tel: true,
      [champ]: false, // seul ce champ est activé
    });
  };

  // detecter modification
  const aEteModifie = () => {
    return (
      champs.nom !== initialChamps.nom ||
      champs.prenom !== initialChamps.prenom ||
      champs.email !== initialChamps.email ||
      champs.tel !== initialChamps.tel
    );
  };
 
  const gererChangement = (e) => {
    const nom = e.target.name;
    const valeur = e.target.value;
    setChamps((champs) => ({ ...champs, [nom]: valeur }));
  };
  useEffect(() => {
    if (authCtx.user) {
      setChamps(authCtx.user);
    }
    setTimeout(() => setChargement(false), 1000);
  }, [authCtx.token]);

  if (chargement)
    return <LoadingScreen text="Récupération des informations..." />;

  if (!authCtx.user) {
    return (
      <div>
        <ButtonPlat
          icon1="person"
          text="Connectez-vous"
          icon2="arrow-right"
          onClick={() => navigate("/authentification")}
        />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="container">
        <UserCard
          champs={champs}
          onChange={gererChangement}
          activerChamp={activerChamp}
          clicks={clicks}
          onClick={() => authCtx.Deconnexion()}
          aEteModifie={aEteModifie}
          enregistrer={() =>{
            alert("Vous ne pouvez pas modifier votre info pour l'instant")
          }}
        />
      </div>
    </div>
  );
}
