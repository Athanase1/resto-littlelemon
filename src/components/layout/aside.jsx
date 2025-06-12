import { Link, useNavigate } from "react-router-dom";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import "./aside.css"
export default function Aside({afficher, onClick, handleClick}){
    return(
        <aside className={afficher ? "ouvert" : ""}>
            <div className="asideBtns">
            <ButtonPlat text="Inscription" onClick={onClick}/>
            <ButtonPlat text="Connexion" onClick={onClick}/>
            </div>
            <ul className="Aside-link">
            <li onClick={handleClick}><Link to="/">Home</Link></li>
            <li onClick={handleClick}><Link to="/about">About</Link></li>
            <li onClick={handleClick}><Link to="/reservation">Reservation</Link></li>
            <li onClick={handleClick}><Link to="/order">Order Online</Link></li>
          </ul>
        </aside>
    )
}