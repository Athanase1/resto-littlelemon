import React, { useState } from "react";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import Login from "./Login";
export default function Profile() {
    const [connecte, setConnecte] = useState(false)
  return <div>
    {connecte ? 
    <p>Hello you</p> : <Login/>
}
  </div>;
}
