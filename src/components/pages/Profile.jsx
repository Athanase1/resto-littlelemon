import React, { useState } from "react";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate()
    const [connecte, setConnecte] = useState(false)
  return <div>
    {connecte ? 
    <p>Hello you</p> : <ButtonPlat text="Connectez-Vous" icon1="bi-person" icon2="bi-arrow-right" onClick={() =>{
      navigate("/authentification")
    }}/>
}
  </div>;
}
