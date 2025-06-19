import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/Context";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import { useNavigate } from "react-router-dom";
import UserCard from "../card/userCard";

export default function Profile() {
  const navigate = useNavigate();
  const authCtx = useContext(UserContext);
  const [utilisateur, setUtilisateur] = useState([]);
  useEffect(() => {
    if (authCtx.user) {
      setUtilisateur(authCtx.user);
    }
  }, []);
  return (
    <div>
      {!utilisateur ? (
        <ButtonPlat
          icon1="person"
          text="Connectez-vous"
          icon2="arrow-right"
          onClick={() => {
            navigate("/authentification");
          }}
        />
      ) : (
        <UserCard
          nom={utilisateur.nom}
          prenom={utilisateur.prenom}
          email={utilisateur.email}
          tel={utilisateur.tel}
        />
      )}
    </div>
  );
}
