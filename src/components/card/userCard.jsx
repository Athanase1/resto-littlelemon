import Input from "../../assets/outil/input/input";
import "./userCard.css"
import logo from "../../assets/images/logovert.png"
import ButtonPlat from "../../assets/outil/buttons/buttonflat";

export default function UserCard({nom,prenom,email, tel, onClick}){
    return(
        <div className="UserCard">
            <div className="photoetNom">
                <img src={logo} alt="user par default" />
                <h1>{`${nom} ${prenom}`}</h1>
            </div>
            <div className="inputs">
                <input type="text" value={nom}/>
                <input type="text" value={prenom} />
                <input type="text"  value={tel}/>
                <input type="text" value={email}/>
            </div>
            <ButtonPlat onClick={onClick} text="Se deconnecter" icon1="bi-box-arrow-left"/>
        </div>
    )
}