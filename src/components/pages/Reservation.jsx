import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import FormGroupe from "../../assets/outil/form-Input/input-groupe";
import {
  date,
  Personnes,
  occasions,
  heuresDisponible,
} from "../../service/DatesetPersonnes";
import Input from "../../assets/outil/input/input";
import "../styles/reservation.css";
import img1 from "../../assets/images/greekSalad.jpg";
import img2 from "../../assets/images/lemonDessert.jpg";
import img3 from "../../assets/images/restauranfood.jpg";
import { useContext, useState } from "react";
import ConfirmationCarte from "../card/ConfirmationCarte";
import { UserContext } from "../../store/AuthContext";
import { ReservationContext } from "../../store/ReservationContext";
import { validerChampsReservation } from "../../service/validerInputs";
import Confirmation from "../../assets/outil/confirmation/confirmation";
import { useNavigate } from "react-router-dom";

export default function Reservation() {
  const authContext = useContext(UserContext);
  const resContext = useContext(ReservationContext);
  const navigate = useNavigate();

  const [champs, setChamps] = useState({});
  const [dat, setDate] = useState("");
  const [nbPersonnes, setPersonnes] = useState("");
  const [occasion, setOccasion] = useState("");
  const [heure, setHeure] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [messageConfirmation, setMessage] = useState("");
  const [errs, setErrs] = useState([]);
  const [afficheComfirmation, setAfficheComfirmation] = useState(false);
  const [chargement, setChargement] = useState(false)

  const [estClic, setEstClic] = useState({
    date: false,
    nbPersonnes: false,
    occasion: false,
    heure: false,
  });
  const erreurs = validerChampsReservation(
    champs,
    dat,
    nbPersonnes,
    occasion,
    heure
  );

  if (authContext.user != null) {
    champs.nom = authContext.user.nom;
    champs.prenom = authContext.user.prenom;
    champs.tel = authContext.user.tel;
    champs.email = authContext.user.email;
  }

  const reserverTable = async () => {
    setChargement(true)
    const res = await resContext.reserver(
      dat,
      nbPersonnes,
      occasion,
      heure,
      champs.nom,
      champs.prenom,
      champs.tel,
      champs.email
    );
    setChargement(false)
    if (res.success) {
       setAfficheComfirmation(true);
      setTimeout(() => {
       setAfficheComfirmation(false)
       navigate("/")
      }, 2000);
    } else {
      setMessage(res.message);
      alert(messageConfirmation)
    }
  };

  function handleClick(name) {
    setEstClic((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }
  function gererChoix(champ, valeur) {
    switch (champ) {
      case "date":
        setDate(valeur);
        break;
      case "nbPersonnes":
        setPersonnes(valeur);
        break;
      case "occasion":
        setOccasion(valeur);
        break;
      case "heure":
        setHeure(valeur);
        break;
      default:
        break;
    }

    // Ferme la liste après le choix
    setEstClic((prev) => ({
      ...prev,
      [champ]: false,
    }));
  }

  const gererChangement = (e) => {
    const nom = e.target.name;
    const valeur = e.target.value;
    setChamps((champs) => ({ ...champs, [nom]: valeur }));
  };
  

  return (
    <div className="res-container">
      {!confirmation && (
        <>
          <form action="" method="post">
            <div className="champs1">
              <div className="f-container">
              <FormGroupe
                value={dat}
                handleClick={() => handleClick("date")}
                estClic={estClic.date}
                label="Date"
                icon="bi bi-calendar"
                name="date"
                data={date}
                valueConfimer={!!dat}
                erreur={errs.date}
              />
              {date && date.length > 0 && (
                <div className={estClic.date ? "liste" : "cacherListe"}>
                  <i className="bi bi-x" onClick={() =>{
                    setEstClic(!estClic)
                  }}></i>
                  {date.map((d, key) => (
                    <li key={key} onClick={() => gererChoix("date", d.value)}>
                      {d.label}
                    </li>
                  ))}
                </div>
              )}
              </div>

              <div className="f-container">
              <FormGroupe
                value={nbPersonnes}
                handleClick={() => handleClick("nbPersonnes")}
                estClic={estClic.nbPersonnes}
                label="Nombre de personnes"
                icon="bi bi-people"
                name="nbPersonnes"
                data={Personnes}
                valueConfimer={!!nbPersonnes}
                erreur={errs.nbPersonnes}
              />
              {Personnes && Personnes.length > 0 && (
                <div className={estClic.nbPersonnes ? "liste" : "cacherListe"}>
                   <i className="bi bi-x" onClick={() =>{
                    setEstClic(!estClic)
                  }}></i>
                  {Personnes.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => gererChoix("nbPersonnes", item.value)}
                    >
                      {item.label}
                    </li>
                  ))}
                </div>
              )}
              </div>

              <div className="f-container">
              <FormGroupe
                value={occasion}
                handleClick={() => handleClick("occasion")}
                estClic={estClic.occasion}
                label="Occasion"
                icon=" bi bi-cup-straw"
                name="occasion"
                valueConfimer={!!occasion}
                erreur={errs.occasion}
              />
              {occasions && occasions.length > 0 && (
                <div className={estClic.occasion ? "liste" : "cacherListe"}>
                   <i className="bi bi-x" onClick={() =>{
                    setEstClic(!estClic)
                  }}></i>
                  {occasions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => gererChoix("occasion", item)}
                    >
                      {item}
                    </li>
                  ))}
                </div>
              )}
              </div>

              <div className="f-container">
              <FormGroupe
                value={heure}
                handleClick={() => handleClick("heure")}
                estClic={estClic.heure}
                label="Heure"
                icon="bi bi-clock"
                name="heure"
                valueConfimer={!!heure}
                erreur={errs.heure}
              />
              {heuresDisponible && heuresDisponible.length > 0 && (
                <div className={estClic.heure ? "liste" : "cacherListe"}>
                   <i className="bi bi-x" onClick={() =>{
                    setEstClic(!estClic)
                  }}></i>
                  {heuresDisponible.map((item, index) => (
                    <li key={index} onClick={() => gererChoix("heure", item)}>
                      {item}
                    </li>
                  ))}
                </div>
              )}
            </div>
            </div>
            <div className="champs2">
              <Input
                label="Nom"
                nom="nom"
                value={champs.nom}
                onChange={gererChangement}
                erreur={errs.nom}
              />
              <Input
                label="Prenom"
                nom="prenom"
                value={champs.prenom}
                onChange={gererChangement}
                erreur={errs.prenom}
              />
              <Input
                label="Email"
                nom="email"
                value={champs.email}
                onChange={gererChangement}
                erreur={errs.email}
              />
              <Input
                label="Tel"
                nom="tel"
                value={champs.tel}
                onChange={gererChangement}
                erreur={errs.tel}
              />
            </div>
          </form>
          <ButtonPlat
            text="Confirmez la reservation"
            icon2="bi-check-circle"
            onClick={() => {
              if (Object.keys(erreurs).length > 0) {
                setErrs(erreurs);
                return;
              }
              setConfirmation(!confirmation);
            }}
          />{" "}
        </>
      )}
      {confirmation && (
        <ConfirmationCarte
          nom={champs.nom}
          prenom={champs.prenom}
          tel={champs.tel}
          details={{
            date: dat,
            nbPersonnes: nbPersonnes,
            occasion: occasion,
            heure: heure,
          }}
          onClick2={() => {
            setConfirmation(!confirmation);
          }}
          onClick={reserverTable}
          chargement={chargement}
        />
      )}
      {afficheComfirmation && (
        <div className="conf">
          <Confirmation
            message="Réservation confirmée avec succès !"
            onClick={() => {
              setAfficheComfirmation(false);
               navigate("/")
            }}
          />
        </div>
      )}

      <div className="plats">
        <img src={img1} alt="img 1" />
        <img src={img2} alt="img 2" />
        <img src={img3} alt="img 3" />
      </div>
    </div>
  );
}
