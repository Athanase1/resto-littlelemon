import logo from "../../assets/images/logoJaune.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import visa from "../../assets/images/Visa-Logo.png";
import master from "../../assets/images/master.jpg";
import Paypal from "../../assets/images/paypal.png";

export default function Footer() {
  const [showLinks, setShowLinks] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const toggleLinks = () => setShowLinks(!showLinks);
  const togglePayments = () => setShowPayments(!showPayments);

  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer>
      <div className="d-flex">
        <nav>
          <div className="linkshead">
            <h1 className="link-title">Liens importants</h1>
            <i
              className={showLinks ? "bi bi-chevron-up" : "bi bi-chevron-down"}
              onClick={toggleLinks}
            ></i>
          </div>
          <ul className={showLinks ? "footer-ul" : "link-cacher"}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservation">Reservation</Link></li>
            <li><Link to="/order">Order Online</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>

        <nav>
          <div className="linkshead">
            <h1 className="link-title">Modes de paiement acceptés</h1>
            <i
              className={showPayments ? "bi bi-chevron-up" : "bi bi-chevron-down"}
              onClick={togglePayments}
            ></i>
          </div>
          <ul className={showPayments ? "footer-ul" : "link-cacher"}>
            <li><img src={master} alt="master card logo" className="logos" /></li>
            <li><img src={visa} alt="visa logo" className="logos" /></li>
            <li><img src={Paypal} alt="paypal logo" className="logos" /></li>
          </ul>
        </nav>
      </div>

      <div className="copydiv">
        <img
          src={logo}
          alt="Logo little lemon"
          onClick={() => navigate("/")}
        />
        <p className="copy">
          Little Lemon &copy; {currentYear} — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
