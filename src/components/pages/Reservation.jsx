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
  return (
    <div className="Reservation-container">
      <div className="section-form">
        <h1>Reservation</h1>
        <form action="">
          <div className="input-groupe">
            <h2>Date</h2>
            <div>
              <i className="bi bi-calendar"></i>
              <input type="number" name="" id="" />
              <i
                className={click1 ? "bi bi-chevron-up" : "bi bi-chevron-down"}
              ></i>
            </div>
          </div>
          <div className="input-groupe">
            <h2>Nombre de personne</h2>
            <div>
              <i className="bi bi-people"></i>
              <input type="date" name="" id="" />
              <i
                className={click2 ? "bi bi-chevron-up" : "bi bi-chevron-down"}
              ></i>
            </div>
          </div>
          <div className="input-groupe">
            <h2>Occasion</h2>
            <div>
              <i className="bi bi-cup-straw"></i>
              <input type="text" name="" id="" />
              <i
                className={click3 ? "bi bi-chevron-up" : "bi bi-chevron-down"}
              ></i>
            </div>
          </div>

          <div className="input-groupe">
            <h2>Heure</h2>
            <div>
              <i className="bi bi-clock"></i>
              <input type="text" />
              <i
                className={click4 ? "bi bi-chevron-up" : "bi bi-chevron-down"}
              ></i>
            </div>
          </div>
        </form>
      </div>
      <div className="plats">
        <img src={Img} alt="image plat salad grec" />
        <img src={Img2} alt="img  plat dessert lime" />
        <img src={Img3} alt="plat saumon fumée" />
      </div>
    </div>
  );
}
