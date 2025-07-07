import Input from "../../assets/outil/input/input";
import "./userCard.css";
import logo from "../../assets/images/logovert.png";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";

export default function UserCard({
  onClick,
  champs,
  onChange,
  enregistrer,
  clicks,
  activerChamp,
  aEteModifie
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
            disabled={clicks.nom}
          />
          <i
            className="bi bi-pencil-square"
            onClick={() => activerChamp("nom")}
          ></i>
        </div>
        <div className="input">
          <input
            type="text"
            name="prenom"
            value={champs.prenom}
            onChange={onChange}
            disabled={clicks.prenom}
          />
          <i
            className="bi bi-pencil-square"
            onClick={() => activerChamp("prenom")}
          ></i>
        </div>
        <div className="input">
          <input
            type="text"
            name="tel"
            value={champs.tel}
            onChange={onChange}
            disabled={clicks.tel}
          />
          <i
            className="bi bi-pencil-square"
            onClick={() => activerChamp("tel")}
          ></i>
        </div>
        <div className="input">
          <input
            type="text"
            name="email"
            value={champs.email}
            onChange={onChange}
            disabled={clicks.email}
          />
          <i
            className="bi bi-pencil-square"
            onClick={() => activerChamp("email")}
          ></i>
        </div>
      </div>
      <div className="bns">
        <ButtonPlat
          onClick={onClick}
          text="Se deconnecter"
          icon1="bi-box-arrow-left"
        />

        <ButtonPlat
          text={"Enregistrer"}
          icon2="bi-check-circle"
          type="submit"
          disabled={!aEteModifie()}
          onClick={enregistrer}
        />
      </div>
    </div>
  );
}
