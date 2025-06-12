import { useState } from "react";
import Form from "../../assets/outil/form/form";
import "../styles/login.css";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";

export default function Login() {
  const [seConnecte, setSeconnecte] = useState(true);
  return (
    <div className="Login">
      <h1>Connectez Vous !</h1>
      <Form authen={true} seConnecte={seConnecte} />
      <ButtonPlat
        icon1="bi-person"
        text={seConnecte ? "Se connecter" : "S'incrire"}
        icon2="bi-arrow-right"
      />
      <h1
       
        onClick={() => {
          setSeconnecte(!seConnecte);
        }}
      >
        {" "}
        <>{seConnecte ? " S'incrire" : "Se connectez"}</>
      </h1>
    </div>
  );
}
