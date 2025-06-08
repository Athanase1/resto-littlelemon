import { useState } from "react";
import Form from "../../assets/outil/form/form";
import "../styles/login.css"
import ButtonPlat from "../../assets/outil/buttons/buttonflat";

export default function Login(){
    const [seConnecte , setSeconnecte] = useState(true)
    return(
        <div className="Login">
            <h1>Connectez Vous !</h1>
          <Form authen={true} seConnecte={seConnecte}/>
          <ButtonPlat icon1="bi-person" text={seConnecte ? "Connectez-vous" : "S'incrire"} icon2="bi-arrow-right"/>
          <h1>{seConnecte ? "Vous n'avez pas un compte?" : "Vous avez un compte connectez-vous!"} <span onClick={() =>{
            setSeconnecte(!seConnecte)
          }}>{seConnecte ?" Créez en un": "Se connectez"}</span></h1>
        </div>
    )
}