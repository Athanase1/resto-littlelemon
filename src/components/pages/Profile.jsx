import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/AuthContext";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import { useNavigate } from "react-router-dom";
import UserCard from "../card/userCard";
import LoadingScreen from "../layout/Loading";

export default function Profile() {
  const navigate = useNavigate();
  const authCtx = useContext(UserContext);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    // petit délai simulé (par exemple appel backend ou vérif session)
    setTimeout(() => setChargement(false), 1000);
  }, []);

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
    <div>
      <UserCard
        nom={authCtx.user.nom}
        prenom={authCtx.user.prenom}
        email={authCtx.user.email}
        tel={authCtx.user.tel}
        onClick={() => {
          authCtx.Deconnexion();
        }}
      />
    </div>
  );
}
