import Img from "../../assets/images/greekSalad.jpg";
import Img2 from "../../assets/images/restauranfood.jpg";
import Img3 from "../../assets/images/lemonDessert.jpg";
import "../styles/reservation.css";
import { useState } from "react";
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
  function handleSuivant(){
    if(suivant){
      alert("hello form pret à envoyé")
      setSuivant(false)
    } else{
      setSuivant(true)
    }
  }
  return (
    <div className="Reservation-container">
      <div className="section-form">
        <h1>Reservation</h1>
        <form action="">
          <h1>{!suivant ? "Detail sur la reservation!" : "Info personnelle!"}</h1>
          {!suivant ? 
          <div className="section1">
            <div className="form-groupe">
              <h2>Date</h2>
              <div className="input-groupe">
                <div className="icon">
                  <i className="bi bi-calendar"></i>
                </div>
                <input type="number" name="" id="" />
                <div className="icon">
                  <i
                    onClick={handleClick}
                    className={
                      click1 ? "bi bi-chevron-up" : "bi bi-chevron-down"
                    }
                  ></i>
                </div>
              </div>
            </div>
            <div className="form-groupe">
              <h2>Nombre de personne</h2>
              <div className="input-groupe">
                <div className="icon">
                  <i className="bi bi-people"></i>
                </div>
                <input type="date" name="" id="" />
                <div className="icon">
                  <i
                    onClick={handleClick2}
                    className={
                      click2 ? "bi bi-chevron-up" : "bi bi-chevron-down"
                    }
                  ></i>
                </div>
              </div>
            </div>
            <div className="form-groupe">
              <h2>Occasion</h2>
              <div className="input-groupe">
                <div className="icon">
                  <i className="bi bi-cup-straw"></i>
                </div>
                <input type="text" defaultValue="Anniversaire" name="" id="" />
                <div className="icon">
                  <i
                    onClick={handleClick3}
                    className={
                      click3 ? "bi bi-chevron-up" : "bi bi-chevron-down"
                    }
                  ></i>
                </div>
              </div>
            </div>

            <div className="form-groupe">
              <h2>Heure</h2>
              <div className="input-groupe">
                <div className="icon">
                  <i className="bi bi-clock"></i>
                </div>
                <input type="text" />
                <div className="icon">
                  <i
                    onClick={handleClick4}
                    className={
                      click4 ? "bi bi-chevron-up" : "bi bi-chevron-down"
                    }
                  ></i>
                </div>
              </div>
            </div>
          </div>
          :<div className="section2">
            <div className="input-groupe1">
              <h2>Nom</h2>
              <input type="text" />
            </div>
            <div className="input-groupe1">
              <h2>Prenom</h2>
              <input type="text" />
            </div>
            <div className="input-groupe1">
              <h2>Email</h2>
              <input type="text" />
            </div>
            <div className="input-groupe1">
              <h2>Numéro</h2>
              <input type="text" />
            </div>
            <div className="input-groupe1">
              <h2>Demande special</h2>
              <textarea type="text" />
            </div>
          </div>
          }
           <button type="submit" onClick={handleSuivant}>{suivant ? "Submettre" : "Suivant"}</button>
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
