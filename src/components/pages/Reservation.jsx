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
   const [valueCon, setValueCon] = useState(false);
   const [valueCon1, setValueCon1] = useState(false);
   const [valueCon2, setValueCon2] = useState(false);
   const [valueCon3, setValueCon3] = useState(false);

  function handleClick() {
    setClick1(!click1);
    
  }  
  function handleStyles() {
    setValueCon(!valueCon)
  }
   function handleStyles1() {
    setValueCon1(!valueCon1)
  }
   function handleStyles2() {
    setValueCon2(!valueCon2)
  }
   function handleStyles3() {
    setValueCon3(!valueCon3)
  }

  function handleClick2() {
    setClick2(!click2);
    setValueCon(!valueCon)

  }
  function handleClick3() {
    setClick3(!click3);
    setValueCon(!valueCon)
  }
  function handleClick4() {
    setClick4(!click4);
    setValueCon(!valueCon)
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
       
        <form action="">
           <h1>Reservation</h1>
          <h1>
            {!suivant ? "Details sur la reservation" : "Info personnelle"}
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
                valueConfimer={valueCon}
                handleClick2={handleStyles}
              />
              <FormGroupe
                icon="bi bi-people"
                label="Nombre de personne"
                estClic={click2}
                handleClick={handleClick2}
                data={Personnes}
                handleClick2={handleStyles1}
                valueConfimer={valueCon1}
              />
              <FormGroupe
                icon="bi bi-cup-straw"
                label="Occasion"
                estClic={click3}
                handleClick={handleClick3}
                data={occasions}
                handleClick2={handleStyles2}
                valueConfimer={valueCon2}
              />
              <FormGroupe
                icon="bi bi-clock"
                label="Heure"
                estClic={click4}
                handleClick={handleClick4}
                data={heuresDisponible}
                handleClick2={handleStyles3}
                valueConfimer={valueCon3}
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
              type={suivant ? "submit" : ""}
            />
          </div>
          <div className="plats">
            <img src={Img} alt="image plat salad grec" />
            <img src={Img2} alt="img  plat dessert lime" />
            <img src={Img3} alt="plat saumon fumée" />
          </div>
        </form>
    </div>
  );
}
