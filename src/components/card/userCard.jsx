import Input from "../../assets/outil/input/input";
import "./userCard.css"
import logo from "../../assets/images/logovert.png"

export default function UserCard({nom,prenom,email, tel}){
    return(
        <div className="UserCard">
            <div className="photoetNom">
                <img src={logo} alt="user par default" />
                <h1>{`${nom} ${prenom}`}</h1>
            </div>
            <div className="inputs">
                <Input label="Nom" value={nom}/> 
               <Input label="Prenom" value={prenom}/> 
               <Input label="Tel" value={tel}/>
               <Input label="Email" value={email}/> 
            </div>
        </div>
    )
}