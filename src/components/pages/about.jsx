import { useState } from "react";
import Image from "../../assets/images/MarioandAdrianA.jpg";
import Image2 from "../../assets/images/MarioandAdrianb.jpg";
import Image3 from "../../assets/images/restaurant.jpg";
import Image4 from "../../assets/images/restaurantChefB.jpg";
import "../styles/about.css";
export default function About() {
  const [click, setClick] = useState(false);

  function handleClick() {
    setClick(!click);
  }
  return (
    <div className="AboutContainer">
      <div className="sub-conatainer">
        <div className="apropos">
          <div className="abouthead">
            <h1>À propos</h1>
            <i
              className={click ? "bi bi-dash-circle" : "bi bi-plus-circle"}
              onClick={handleClick}
            ></i>
          </div>
          <p className={click && "p-long"}>
            Bienvenue chez Little Lemon, un restaurant méditerranéen familial où
            la tradition culinaire rencontre la modernité. Situé au cœur de la
            ville, notre établissement s’inspire de recettes transmises de
            génération en génération, revisitées avec une touche contemporaine.
            Notre histoire commence avec une passion commune pour la bonne
            cuisine et le partage. Nous avons imaginé un lieu chaleureux où l’on
            se sent comme à la maison, où chaque plat raconte une histoire,
            celle de nos origines et de notre amour pour la gastronomie
            méditerranéenne. Des mezzés faits maison aux plats grillés
            savoureux, chaque ingrédient est soigneusement sélectionné pour sa
            fraîcheur et sa qualité. Que ce soit pour un déjeuner rapide, un
            dîner entre amis ou un moment en famille, nous vous promettons une
            expérience riche en saveurs et en convivialité. Little Lemon, c’est
            plus qu’un simple restaurant — c’est une invitation au voyage, une
            célébration des saveurs, des souvenirs et de la culture. Et même si
            ce restaurant est fictif, notre passion pour la cuisine et le
            développement web est bien réelle. Ce projet est né d’une envie :
            créer un univers digital aussi vivant et chaleureux qu’un véritable
            restaurant.
          </p>
        </div>
        <div className="imgs">
          <img id="img1" src={Image2} alt="Photo du propritaire et son fils" />
          <img id="img2" src={Image} alt="Photo du propritaire et son fils" />
        </div>
      </div>
      <p className="Title">Bienvenue chez Little lemon!</p>
      <div className="restaurantdetails">
        <div className="detail-card">
          <p className="title">
            Situé au cœur de la ville, Little Limon est un restaurant familial
            qui célèbre les saveurs authentiques de la Méditerranée.
          </p>
          <img src={Image3} alt="restaurant" />
        </div>
        <div className="detail-card">
          <p className="title">
            Que ce soit pour déguster un délicieux mezze entre amis ou savourer
            un tajine revisité, chaque plat raconte une histoire — celle de la
            Méditerranée, entre terre et mer.
          </p>
          <img src={Image4} alt="un cuisinier qui prepare un plat" />
        </div>
      </div>
    </div>
  );
}
