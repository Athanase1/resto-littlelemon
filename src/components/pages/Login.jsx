import { useState } from "react";
import Form from "../../assets/outil/form/form";
import "../styles/login.css";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import axios from "axios"

export default function Login() {
 async function gestionSubmission(){
    
  }
  const [seConnecte, setSeconnecte] = useState(true);
  return (
    <div className="Login">
      <Form authen={true} seConnecte={seConnecte} gestionSub={gestionSubmission} />
    </div>
  );
}
