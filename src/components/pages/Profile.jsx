import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/AuthContext";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import { useNavigate } from "react-router-dom";
import UserCard from "../card/userCard";
import LoadingScreen from "../layout/Loading";
import "../styles/profile.css";
import { ReservationContext } from "../../store/ReservationContext";
import ReservationCarte from "../card/reservationCarte";

export default function Profile() {
  const navigate = useNavigate();
  const authCtx = useContext(UserContext);
  const resContext = useContext(ReservationContext);
  const [chargement, setChargement] = useState(true);
  const [champs, setChamps] = useState({});
  const [estClic, setEstClic] = useState(false);
  const [click, setClick] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [pasReserves, setPas] = useState(true);
  const [err, serErr] = useState(null)
  async function trouverRes() {
    if (authCtx.user) {
      console.log(authCtx.user);
      const res = await resContext.reservations(authCtx.user.tel);
      if (res.success) {
        setReservations(res.data); // ✅ valeur sûre
        setPas(false);
        console.log(res.data);
      } else {
        setPas(true);
        serErr(res.message)
      }
    }
  }

  useEffect(() => {
    trouverRes();
  }, []);

  function handleClick() {
    setEstClic(!estClic);
  }
  const gererChangement = (e) => {
    const nom = e.target.name;
    const valeur = e.target.value;
    setChamps((champs) => ({ ...champs, [nom]: valeur }));
  };

  useEffect(() => {
    // petit délai simulé (par exemple appel backend ou vérif session)
    if (authCtx.user) {
      setChamps(authCtx.user);
    }
    setTimeout(() => setChargement(false), 1000);
  }, [authCtx.token]);

  if (chargement)
    return <LoadingScreen text="Récupération des informations..." />;

  if (!authCtx.user) {
    return (
      <div>
        <ButtonPlat
          icon1="person"
          text="Connectez-vous"
          icon2="arrow-right"
          onClick={() => navigate("/authentification")}
        />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <UserCard
        champs={champs}
        onChange={gererChangement}
        estClic={estClic}
        onclick2={handleClick}
        disabled={estClic}
      />
      <div className="reservations-container">
        <div className="head">
          <h1>Liste des reservations</h1>
          <i
            className={click ? "bi bi-chevron-up" : "bi bi-chevron-down"}
            onClick={() => {
              setClick(!click);
            }}
          ></i>
        </div>
          {err && <h1>{err}</h1>}
        {!pasReserves && click && (
          <div className="reserves">
            {reservations.map((res, index) => (
              <ReservationCarte key={index} details={res} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
