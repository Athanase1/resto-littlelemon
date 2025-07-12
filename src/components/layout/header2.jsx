import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logovert.png";


import "./header2.css";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import { useContext } from "react";
import { UserContext } from "../../store/AuthContext";
export default function Header2({ handleClick, click }) {
  const navigate = useNavigate();
  const authCtx = useContext(UserContext)
  return (
    <div className="header2-container">
      <div className="logoI">
        <i
          className={`bi ${click ? "bi-x" : "bi-list"} animated-icon`}
          onClick={handleClick}
        ></i>
        <h1
          className="logo1"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="logo" />
          Little Lemon
        </h1>
      </div>
      <div className="btns">
        <i className="bi bi-person-fill" onClick={() =>{
          navigate("/profile")
        }}></i>
        {authCtx.user && <h1 className="userName">{authCtx.user.prenom}<i className="bi bi-person" onClick={() =>{
          navigate("/profile")
        }}></i></h1>}
        {!authCtx.user && <><ButtonPlat
          icon1="bi-person"
          text="Se Connecter"
          icon2="bi-arrow-right"
          onClick={() => {
            navigate("/authentification");
          }}
        />
        <ButtonPlat
          icon1="bi-person"
          text="S'incrire"
          icon2="bi-arrow-right"
          onClick={() => {
            navigate("/authentification");
          }}
        /></>}
      </div>
    </div>
  );
}
