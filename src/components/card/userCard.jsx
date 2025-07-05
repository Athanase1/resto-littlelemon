import Input from "../../assets/outil/input/input";
import "./userCard.css";
import logo from "../../assets/images/logovert.png";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";

export default function UserCard({
  onClick,
  champs,
  onChange,
  onclick2,
  estClic,
  disabled
}) {
  return (
    <div className="UserCard">
      <div className="photoetNom">
        <img src={logo} alt="user par default" />
        <h1>{`${champs.nom} ${champs.prenom}`}</h1>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="text"
            name="nom"
            value={champs.nom}
            onChange={onChange}
            disabled={disabled}
           
          />
          <i className="bi bi-pencil-square" onClick={onclick2}></i>
        </div>
        <div className="input">
          <input
            type="text"
            name="prenom"
            value={champs.prenom}
            onChange={onChange}
            disabled={disabled}
            
          />
          <i className="bi bi-pencil-square" onClick={onclick2}></i>
        </div>
        <div className="input">
          <input
            type="text"
            name="tel"
            value={champs.tel}
            onChange={onChange}
            disabled={disabled}
           
          />
          <i className="bi bi-pencil-square" onClick={onclick2}></i>
        </div>
        <div className="input">
          <input
            type="text"
            name="email"
            value={champs.email}
            onChange={onChange}
            disabled={disabled}
       
          />
          <i className="bi bi-pencil-square" onClick={onclick2}></i>
        </div>
      </div>
      <div className="bns">
        <ButtonPlat
          onClick={onClick}
          text="Se deconnecter"
          icon1="bi-box-arrow-left"
        />
        
        <ButtonPlat
          onClick={onClick}
          text={estClic ? "Enregistrer":"modifier"}
          icon2="bi-check-circle"
        />
      </div>
    </div>
  );
}
