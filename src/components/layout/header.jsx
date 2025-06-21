import Logo from "../../assets/images/logoJavecNom.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header({ onclick, display }) {
  const navigate = useNavigate();
  return (
    <header>
      <div className="logoAndIcon">
        <div className="bis">
          <i
            className={display ? "bi bi-x" : "bi bi-list"}
            onClick={onclick}
          ></i>
        </div>
        <img
          src={Logo}
          alt="Logo"
          id="logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="bis">
          <i
            className="bi bi-person-fill"
            onClick={() => {
              navigate("/profile");
            }}
          ></i>
        </div>
      </div>

      <nav>
        <ul className={display ? "afficher" : "cacher"}>
          <li>
            <Link to="/" onClick={onclick}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={onclick}>
              À propos
            </Link>
          </li>

          <li>
            <Link to="/reservation" onClick={onclick}>
              Réservation
            </Link>
          </li>
          <li>
            <Link to="/order" onClick={onclick}>
              Commande en ligne
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={onclick}>
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
