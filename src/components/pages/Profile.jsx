import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/Context";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const navigate = useNavigate()
const authCtx = useContext(UserContext)
  return <div>
    {!authCtx.connecte ?<ButtonPlat icon1="person"  text="Connectez-vous" icon2="arrow-right" onClick={() =>{
      navigate("/authentification")
    }}/> :  <p>{authCtx.user.nom}</p>}
  </div>;
}
