import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import FormGroupe from "../../assets/outil/form-Input/input-groupe";
import {
  
  Personnes,
  occasions,
  dateFormatee,
  getHeuresDisponible,
  dateDisponible,
} from "../../service/DatesetPersonnes";
import Input from "../../assets/outil/input/input";
import "../styles/reservation.css";
import img1 from "../../assets/images/greekSalad.jpg";
import img2 from "../../assets/images/lemonDessert.jpg";
import img3 from "../../assets/images/restauranfood.jpg";
import { useContext, useEffect, useState } from "react";
import ConfirmationCarte from "../card/ConfirmationCarte";
import { UserContext } from "../../store/AuthContext";
import { ReservationContext } from "../../store/ReservationContext";
import {
  estReservationValide,
  validerChampModification,
  validerChampsReservation,
 
} from "../../service/validerInputs";
import Confirmation from "../../assets/outil/confirmation/confirmation";
import { useNavigate } from "react-router-dom";
import ReservationCarte from "../card/reservationCarte";
import Form2 from "../../assets/outil/form/form2";
import LoadingScreen from "../layout/Loading";

export default function Reservation() {
  
  const authCtx = useContext(UserContext);
  const resContext = useContext(ReservationContext);
  const navigate = useNavigate();

  const [champs, setChamps] = useState({
    nom: "Doe",
    prenom: "John",
    tel: "5819944946",
    email: "exemple@gmail.com",
  });

  const [dat, setDate] = useState(dateFormatee);
  const heures = getHeuresDisponible(dat);
  const [nbPersonnes, setPersonnes] = useState("8");
  const [occasion, setOccasion] = useState("Anniversaire");
  const [heure, setHeure] = useState(heures[0]);
  const [id, setId] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [messageConfirmation, setMessage] = useState("");
  const [errs, setErrs] = useState([]);
  const [afficheComfirmation, setAfficheComfirmation] = useState(false);
  const [chargement, setChargement] = useState(true);
  const [valR, setValR] = useState("");
  const [err, setErr] = useState();
  const [text, setText] = useState("");
  const [demandeModif, setDemande] = useState(false);
  const [res, setRes] = useState([]);

  const trouver = async (num = valR) => {
    const numero = num.trim();
    if (!numero) return;

    setChargement(true);
    setText("");
    setErr(null);

    try {
      const result = await resContext.reservations(numero);

      if (result.success && result.data.length > 0) {
        const nonExpirees = result.data.filter(estReservationValide);

        if (nonExpirees.length === 0) {
          setText("Aucune réservation à venir pour ce numéro.");
          setRes([]);
        } else {
          setRes(nonExpirees);
          localStorage.setItem("tel", numero); // On stocke uniquement le numéro
        }
      } else {
        setText("Aucune réservation associée à ce numéro.");
        setRes([]);
      }
    } catch (e) {
      console.error("Erreur de recherche :", e);
      setText("Erreur lors de la recherche.");
    } finally {
      setTimeout(() => setChargement(false), 1000);
    }
  };

  function chercherRes() {
    const tel = localStorage.getItem("tel");
    if (tel) {
      setValR(tel);
      trouver(tel); // on utilise la version modifiée de `trouver()` juste en dessous
    } else {
      setText("Recherchez une réservation avec votre numéro.");
    }
  }

  /* function pour chercher un num de tel */
  function trouverTel() {
    const tel = localStorage.getItem("tel");
    if (tel) {
      setValR(tel);
    }
  }

  const trouverRes = async () => {
    if (!authCtx.user) {
      return;
    } else if (authCtx.user) {
      const res = await resContext.reservations(authCtx.user.tel);
      if (res.success) {
        setRes(res.data);
      } else {
        setText("Aucun reservations pour le moment");
      }
    }
  };

  const modifier = async () => {
    const erreurs = validerChampModification(
      valeurs.date,
      valeurs.nbPersonnes,
      valeurs.occasion,
      valeurs.heure
    );

    if (Object.keys(erreurs).length > 0) {
      return;
    }

    setChargement(true);

    const res = await resContext.modifier(
      id,
      valeurs.date,
      valeurs.nbPersonnes,
      valeurs.occasion,
      valeurs.heure
    );
    if (!res.success) {
      alert(res.message);
    }
    trouver();
    setDemande(false);
    setTimeout(() => setChargement(false), 1000);
  };
  // Champs pour modification
  const [valeurs, setValeurs] = useState({
    date: "",
    nbPersonnes: "",
    occasion: "",
    heure: "",
  });
  const gererChangement2 = (e) => {
    const nom = e.target.name;
    const valeur = e.target.value;
    setValeurs((valeurs) => ({ ...valeurs, [nom]: valeur }));
  };
  const [estClic, setEstClic] = useState({
    date: false,
    nbPersonnes: false,
    occasion: false,
    heure: false,
  });
  const erreurs2 = validerChampModification(
    valeurs.date,
    valeurs.nbPersonnes,
    valeurs.occasion,
    valeurs.heure
  );
  const erreurs = validerChampsReservation(
    champs,
    dat,
    nbPersonnes,
    occasion,
    heure
  );

  if (authCtx.user != null) {
    champs.nom = authCtx.user.nom && authCtx.user.nom;
    champs.prenom = authCtx.user.prenom && authCtx.user.prenom;
    champs.tel = authCtx.user.tel && authCtx.user.tel;
    champs.email = authCtx.user.email &&  authCtx.user.email;
  }
  

  const reserverTable = async () => {
    setChargement(true);
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
    setChargement(false);
    if (res.success) {
      setAfficheComfirmation(true);
      setTimeout(() => {
        setAfficheComfirmation(false);
        navigate("/");
      }, 2000);
    } else {
      setMessage(res.message);
      alert(messageConfirmation);
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
  function handleChangement(e) {
    const val = e.target.value;
    setValR(val);
  }

  const gererChangement = (e) => {
    const nom = e.target.name;
    const valeur = e.target.value;
    setChamps((champs) => ({ ...champs, [nom]: valeur }));
  };
  const supprimer = async (id) => {
    const res = await resContext.supprimerReservation(id);

    if (res.success) {
      alert("Réservation supprimée avec succès !");
      await trouver(); // Recharge les réservations à jour
    } else {
      alert("Erreur : " + res.message);
    }
  };

  /*charger reservation automatiquement */
  useEffect(() => {
    setChargement(true);
    chercherRes(); // ← lance automatiquement la recherche avec le numéro stocké
    setTimeout(() => setChargement(false), 1000);
  }, []); // ← tableau vide pour n’exécuter qu’une fois au chargement
  if (chargement)
    return <LoadingScreen text="Récupération des informations..." />;

  return (
    <div className="res-container">
      <div className="zoneRecherche">
        <div className="searc-input">
          <Input value={valR} onChange={handleChangement} erreur={err} />
          <ButtonPlat
            icon2="bi-search"
            text="Trouver"
            onClick={() => {
              trouver();
            }}
          />
        </div>
        <div className="reserves">
          {text && <p>{text}</p>}
          {res.map((res) => (
            <ReservationCarte
              details={res.id_reservation}
              modifier={() => {
                setDemande(true);
                setValeurs(res.id_reservation);
                setId(res.id_reservation);
              }}
              supprimer={() => {
                supprimer(res.id_reservation);
                trouverTel();
                trouverRes();
                chercherRes();
              }}
            />
          ))}
        </div>
      </div>
      <h1>Reserver une table!</h1>
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
                  data={dateDisponible}
                  valueConfimer={!!dat}
                  erreur={errs.date}
                />
                { dateDisponible.length > 0 && (
                  <div className={estClic.date ? "liste" : "cacherListe"}>
                    <i
                      className="bi bi-x"
                      onClick={() => {
                        setEstClic(!estClic);
                      }}
                    ></i>
                    {dateDisponible.map((d, key) => (
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
                  <div
                    className={estClic.nbPersonnes ? "liste" : "cacherListe"}
                  >
                    <i
                      className="bi bi-x"
                      onClick={() => {
                        setEstClic(!estClic);
                      }}
                    ></i>
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
                    <i
                      className="bi bi-x"
                      onClick={() => {
                        setEstClic(!estClic);
                      }}
                    ></i>
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
                {heures.length > 0 && (
                  <div className={estClic.heure ? "liste" : "cacherListe"}>
                    <i
                      className="bi bi-x"
                      onClick={() => {
                        setEstClic(!estClic);
                      }}
                    ></i>
                    {heures.map((item, index) => (
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
              navigate("/");
            }}
          />
        </div>
      )}

      <div className="plats">
        <img src={img1} alt="img 1" />
        <img src={img2} alt="img 2" />
        <img src={img3} alt="img 3" />
      </div>

      {demandeModif && (
        <div className="zoneForm">
          {" "}
          <Form2
            champs={valeurs}
            errs={erreurs2}
            annuler={() => setDemande(false)}
            enregister={modifier}
            gererChangement={gererChangement2}
          />{" "}
        </div>
      )}
    </div>
  );
}
