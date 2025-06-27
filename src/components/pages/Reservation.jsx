import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import FormGroupe from "../../assets/outil/form-Input/input-groupe";
import { date, Personnes, occasions, heuresDisponible } from "../../service/DatesetPersonnes";
import Input from "../../assets/outil/input/input";
import "../styles/reservation.css";
import img1 from "../../assets/images/greekSalad.jpg";
import img2 from "../../assets/images/lemonDessert.jpg";
import img3 from "../../assets/images/restauranfood.jpg";
import { useState } from "react";
import ConfirmationCarte from "../card/ConfirmationCarte";

export default function Reservation() {
  const [champs, setChamps] = useState({});
  const [dat, setDate] = useState(null);
  const [nbPersonnes, setPersonnes] = useState(null);
  const [occasion, setOccasion] = useState(null);
  const [heure, setHeure] = useState(null);

  const [estClic, setEstClic] = useState({
    date: false,
    nbPersonnes: false,
    occasion: false,
    heure: false,
  });
  const [confirmation, setConfirmation] = useState(false);

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
              <FormGroupe
                value={dat}
                handleClick={() => handleClick("date")}
                estClic={estClic.date}
                label="Date"
                icon="bi bi-calendar"
                name="date"
                data={date}
              />
              {date && date.length > 0 && (
                <div className={estClic.date ? "liste" : "cacherListe"}>
                  {date.map((item, index) => (
                    <li key={index} onClick={() => gererChoix("date", item)}>
                      {item}
                    </li>
                  ))}
                </div>
              )}

              <FormGroupe
                value={nbPersonnes}
                handleClick={() => handleClick("nbPersonnes")}
                estClic={estClic.nbPersonnes}
                label="Nombre de personnes"
                icon="bi bi-people"
                name="nbPersonnes"
                data={Personnes}
              />
              {Personnes && Personnes.length > 0 && (
                <div className={estClic.nbPersonnes ? "liste" : "cacherListe"}>
                  {Personnes.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => gererChoix("nbPersonnes", item)}
                    >
                      {item}
                    </li>
                  ))}
                </div>
              )}

              <FormGroupe
                value={occasion}
                handleClick={() => handleClick("occasion")}
                estClic={estClic.occasion}
                label="Occasion"
                icon=" bi bi-cup-straw"
                name="occasion"
              />
              {occasions && occasions.length > 0 && (
                <div className={estClic.occasion ? "liste" : "cacherListe"}>
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
              <FormGroupe
                value={heure}
                handleClick={() => handleClick("heure")}
                estClic={estClic.heure}
                label="Heure"
                icon="bi bi-clock"
                name="heure"
              />
                {heuresDisponible && heuresDisponible.length > 0 && (
                <div className={estClic.heure ? "liste" : "cacherListe"}>
                  {heuresDisponible.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => gererChoix("heure", item)}
                    >
                      {item}
                    </li>
                  ))}
                </div>
              )}
            </div>
            <div className="champs2">
              <Input
                label="Nom"
                nom="nom"
                value={champs.nom}
                onChange={gererChangement}
              />
              <Input
                label="Prenom"
                nom="prenom"
                value={champs.prenom}
                onChange={gererChangement}
              />
              <Input
                label="Email"
                nom="email"
                value={champs.email}
                onChange={gererChangement}
              />
              <Input
                label="Tel"
                nom="tel"
                value={champs.tel}
                onChange={gererChangement}
              />
            </div>
          </form>
          <ButtonPlat
            text="Comfirmez la reservation"
            icon2="bi-check-circle"
            onClick={() => {
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
        />
      )}

      <div className="plats">
        <img src={img1} alt="img 1" />
        <img src={img2} alt="img 2" />
        <img src={img3} alt="img 3" />
      </div>
    </div>
  );
}
