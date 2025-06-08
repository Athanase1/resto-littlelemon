import { Link, useNavigate } from "react-router-dom";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import "./aside.css"
export default function Aside({afficher}){
    return(
        <aside className={afficher ? "ouvert" : ""}>
            <div className="asideBtns">
            <ButtonPlat text="Inscription"/>
            <ButtonPlat text="Connexion"/>
            </div>
            <ul className="Aside-link">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
            <li><Link to="/order">Order Online</Link></li>
          </ul>
        </aside>
    )
}