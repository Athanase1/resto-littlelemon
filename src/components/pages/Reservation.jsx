import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import FormGroupe from "../../assets/outil/form-Input/input-groupe";
import Form from "../../assets/outil/form/form";
import Input from "../../assets/outil/input/input";
import "../styles/reservation.css"
import img1 from "../../assets/images/greekSalad.jpg"
import img2 from "../../assets/images/lemonDessert.jpg"
import img3 from "../../assets/images/restauranfood.jpg"
import { useState } from "react";

export default function Reservation(){
  const [champs, setChamps] = useState({})
  const gererChangement = (e) =>{
    const nom = e.target.name;
    const valeur = e.target.value;
    setChamps(champs => ({...champs, [nom]: valeur}))
  }
  return<div className="res-container">
            <form action="" method="post">
              <div className="champs1">
                <FormGroupe label="Date" icon="bi-calendar" value={champs.date} name="date" />
                <FormGroupe label="Nombre de personnes" value={champs.nbPersonnes} icon="bi-people" name="nbPersonnes"/>
                <FormGroupe label="Occasion" icon="bi-cup-straw" value={champs.occasion} name="occasion"/>
                <FormGroupe label="Heure" icon="bi-clock" value={champs.heure} name="heure"/>
              </div>
              <div className="champs2">
                <Input label="Nom" nom="nom" value={champs.nom} onChange={gererChangement}/>
                <Input label="Prenom" nom="Prenom" value={champs.prenom} onChange={gererChangement}/>
                <Input label="Email" nom="email" value={champs.email} onChange={gererChangement}/>
                <Input label="Tel" nom="tel" value={champs.tel} onChange={gererChangement}/>
              </div>
              <ButtonPlat text="Comfirmez la reservation" icon2="bi-check-circle"/>
            </form>
            <div className="plats">
                <img src={img1} alt="img 1" /><img src={img2} alt="img 2" /><img src={img3} alt="img 3" />
            </div>
  </div>
}