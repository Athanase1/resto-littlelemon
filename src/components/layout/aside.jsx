import { Link, useNavigate } from "react-router-dom";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import "./aside.css"
import { useContext } from "react";
import { UserContext } from "../../store/AuthContext";
export default function Aside({afficher, onClick, handleClick}){
    const authCtx = useContext(UserContext)
    return(
        <aside className={afficher ? "ouvert" : ""}>
            <div className="asideBtns">
                {!authCtx.user && <> <ButtonPlat text="Inscription" onClick={onClick}/>
            <ButtonPlat text="Connexion" onClick={onClick}/></>}
           
            </div>
            <ul className="Aside-link">
            <li onClick={handleClick}><Link to="/">Home</Link></li>
            <li onClick={handleClick}><Link to="/about">About</Link></li>
            <li onClick={handleClick}><Link to="/reservation">Reservation</Link></li>
            <li onClick={handleClick}><Link to="/menu">Order Online</Link></li>
          </ul>
        </aside>
    )
}