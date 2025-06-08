import Img from "../../assets/images/greekSalad.jpg";
import Img2 from "../../assets/images/restauranfood.jpg";
import Img3 from "../../assets/images/lemonDessert.jpg";
import "../styles/reservation.css";
import {
  Personnes,
  occasions,
  heuresDisponible,
  date,
} from "../../../src/service/heures";
import { useState } from "react";
import FormGroupe from "../../assets/outil/form-Input/input-groupe";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import Input from "../../assets/outil/input/input";
import Form from "../../assets/outil/form/form";
export default function Reservation() {
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const [click4, setClick4] = useState(false);
  const [suivant, setSuivant] = useState(false);

  function handleClick() {
    setClick1(!click1);
  }
  function handleClick2() {
    setClick2(!click2);
  }
  function handleClick3() {
    setClick3(!click3);
  }
  function handleClick4() {
    setClick4(!click4);
  }
  function handleSuivant() {
    if (suivant) {
      alert("hello form pret à envoyé");
      setSuivant(false);
    } else {
      setSuivant(true);
    }
  }
  return (
    <div className="Reservation-container">
      <div className="section-form">
        <h1>Reservation</h1>
        <form action="">
          <h1>
            {!suivant ? "Detail sur la reservation!" : "Info personnelle!"}
          </h1>
          {!suivant ? (
            <div className="section1">
              <FormGroupe
                label="Date"
                icon="bi bi-calendar"
                name="date"
                estClic={click1}
                handleClick={handleClick}
                data={date}
              />
              <FormGroupe
                icon="bi bi-people"
                label="Nombre de personne"
                estClic={click2}
                handleClick={handleClick2}
                data={Personnes}
              />
              <FormGroupe
                icon="bi bi-cup-straw"
                label="Occasion"
                estClic={click3}
                handleClick={handleClick3}
                data={occasions}
              />
              <FormGroupe
                icon="bi bi-clock"
                label="Heure"
                estClic={click4}
                handleClick={handleClick4}
                data={heuresDisponible}
              />
            </div>
          ) : (
            <div className="section2">
              <Form/>
              <div className="input-groupe1">
                <h2>Demande special</h2>
                <textarea type="text" />
              </div>
            </div>
          )}
          <div className="btn">
            <ButtonPlat
              text={suivant ? "Submettre" : "Suivant"}
              icon2="bi bi-arrow-right"
              onClick={handleSuivant}
            />
          </div>
          <div className="plats">
            <img src={Img} alt="image plat salad grec" />
            <img src={Img2} alt="img  plat dessert lime" />
            <img src={Img3} alt="plat saumon fumée" />
          </div>
        </form>
      </div>
    </div>
  );
}
