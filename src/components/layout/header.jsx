import Logo from "../../assets/images/logoJavecNom.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header({ onclick, display }) {
    const navigator = useNavigate()
  return (
    <header>
      
      <div className="logoAndIcon">
      <div className="bis">
          
          <i className={display ? "bi bi-x" : "bi bi-list"} onClick={onclick}></i>
        </div>
        <img src={Logo} alt="Logo" id="logo" onClick={()=>{
            navigator.navigate("/")
        }}/>
        <div className="bis">
          <i className="bi bi-basket"></i>
         
        </div>
      </div>

      <nav>
        <ul className={display ? "afficher" : "cacher"}>
          <li><Link to="/" onClick={onclick}>Home</Link></li>
          <li><Link to="/about" onClick={onclick}>About</Link></li>
          <li><Link to="/menu" onClick={onclick}>Menu</Link></li>
          <li><Link to="/reservation" onClick={onclick}>Reservation</Link></li>
          <li><Link to="/order" onClick={onclick}>Order Online</Link></li>
          <li><Link to="/login" onClick={onclick} >Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}
