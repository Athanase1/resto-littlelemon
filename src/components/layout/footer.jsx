import logo from "../../assets/images/logoJaune.png"
import { useState } from "react"
import { Link, useNavigate} from "react-router-dom"
export default function Footer({}){
    const [click, setClick] = useState(false)
    const [click2, setClick1] = useState(false)
    function handleClick1(){
        setClick(!click)
    }
    function handleClick2(){
      setClick1(!click2)
  }
    const annecurrent = new Date().getFullYear()
    const navigate = useNavigate()
    return(
        <footer>
          <div className="d-flex">
        <nav>
            <div className="linkshead">
                <h1 className="link-title">Liens importants</h1>
                <i className={click ? "bi bi-chevron-up" : "bi bi-chevron-down"} onClick={handleClick1}></i>
            </div> 
        <ul className={click ? "footer-ul": "link-cacher"}>
          <li><Link to="/" >Home</Link></li>
          <li><Link to="/about" >About</Link></li>
          <li><Link to="/menu" >Menu</Link></li>
          <li><Link to="/reservation" >Reservation</Link></li>
          <li><Link to="/order">Order Online</Link></li>
          <li><Link to="/login" >Login</Link></li>
        </ul>
      </nav>
      <nav>
            <div className="linkshead">
                <h1 className="link-title">Mode de paiments acceptés</h1>
                <i className={click2 ? "bi bi-chevron-up" : "bi bi-chevron-down"} onClick={handleClick2}></i>
            </div>
            
        <ul className={click2 ? "footer-ul": "link-cacher"}>
          <li>MasterCard</li>
          <li>Visa</li>
          <li>Apple pay</li>
          <li>PayPal</li>
        </ul>
      </nav>
      </div>
      <div className="copydiv">
        <img src={logo} alt="Logo little lemon" onClick={() =>{
          navigate("/")
        }} />
      <p className="copy">Little limon &copy; {annecurrent} tout droit reservé</p>
      </div>
    </footer>
    )
}