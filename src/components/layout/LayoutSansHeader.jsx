import { Outlet, useNavigate } from "react-router-dom";
import Header2 from "./header2";
import Aside from "./aside";
import "./layOut2.css";
import { useState } from "react";
export default function LaySansHeader() {
  const [afficheAside, setAfficheaside] = useState(false);
  const navigate = useNavigate()
  return (
    <div className={afficheAside ? "layout-sansHeader" : "layout-sansHeader layout-hideAside"}>
      <Header2
      click={afficheAside}
        handleClick={() => {
          setAfficheaside(!afficheAside);
        }}
      />
      {afficheAside && <Aside afficher={afficheAside} onClick={() =>{
        navigate("/authentification")
      }} handleClick={() =>{
        setAfficheaside(!afficheAside)
      }}/>}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
