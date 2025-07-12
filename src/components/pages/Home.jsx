import { useNavigate } from "react-router-dom";
import Photo1 from "../../assets/images/restauranfood.jpg";
import "../styles/home.css";
import { special } from "../../assets/data/special";
import Special from "../card/special";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import { UserContext } from "../../store/AuthContext";
import { useContext, useState,useEffect } from "react";
import TermsCard from "../card/terme/terme";
export default function Home() {
  const navigate = useNavigate();
  const authCtx = useContext(UserContext);
 const [showTerms, setShowTerms] = useState(() => {
  // Cette fonction sera appelée au premier rendu
  return !localStorage.getItem("acceptedTerms");
});


  useEffect(() => {
    const accepted = localStorage.getItem("acceptedTerms");
    if (!accepted) {
      setShowTerms(true);
      document.body.style.overflow = "hidden"; // 🔒 Empêche le scroll
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("acceptedTerms", "true");
    setShowTerms(false);
    document.body.style.overflow = "auto"; // ✅ Réactive le scroll
    alert("Rassurez vous ce site à pour but de démontrer mes compétences rien d'autre!")
  };
  return (
    <div className="homecontainer">
      <div className="conteneur1">
        <div className="presentation">
          <div>
            <h1 className="title">Little Lemon</h1>
            <p id="desc">
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes recipes served with a modern twist.
            </p>
          </div>
          <div className="btn">
            <ButtonPlat
              text="Reservez une table"
              icon1="bi-bookmark-star"
              icon2="bi-arrow-right"
              onClick={() => {
                navigate("/reservation");
              }}
            />
          </div>
        </div>
        <div className="img">
          <img src={Photo1} alt="image d'un plat" id="plat" />
        </div>
      </div>
      {authCtx.user && <h1> Bienvenue {authCtx.user.prenom} !</h1>}
      <div className="conteneur2">
        <div className="head">
          <h1 className="subtitle">This weeks specials!</h1>
          <div className="btn">
            <ButtonPlat
              text="Commandez en ligne"
              icon2="bi-arrow-right"
              onClick={() => {
                navigate("/menu");
              }}
            />
          </div>
        </div>

        <div className="special-menu">
          {special.map((item) => (
            <Special
              titre={item.titre}
              prix={item.prix}
              desc={item.desc}
              key={item.id}
              img={item.img}
              onclick={() => {
                navigate("/menu");
              }}
            />
          ))}
        </div>
      </div>
      {showTerms && (
        <TermsCard
          onAccept={handleAccept}
        />
      )}
    </div>
  );
}
