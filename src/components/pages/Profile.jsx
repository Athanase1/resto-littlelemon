import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/AuthContext";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import { useNavigate } from "react-router-dom";
import UserCard from "../card/userCard";
import LoadingScreen from "../layout/Loading";
import "../styles/profile.css";
import { ReservationContext } from "../../store/ReservationContext";
import ReservationCarte from "../card/reservationCarte";
import Form2 from "../../assets/outil/form/form2.jsx";
import { validerChampModification } from "../../service/validerInputs.js";

export default function Profile() {
  const navigate = useNavigate();
  const authCtx = useContext(UserContext);
  const resContext = useContext(ReservationContext);
  const [chargement, setChargement] = useState(true);
  const [demandeModif, setDemande] = useState(false);
  const [champs, setChamps] = useState({});
  const [reservations, setReservations] = useState([]);
  const [pasReserves, setPas] = useState(true);
  const [err, serErr] = useState(null);
  const [id, setId] = useState("");
  const [click, setClick] = useState(false);
  const [initialChamps, setInitialChamps] = useState(authCtx.user);
  const [clicks, setClicks] = useState({
    nom: true,
    prenom: true,
    email: true,
    tel: true,
  });
  // function pour activer un champs precis
  const activerChamp = (champ) => {
    setClicks({
      nom: true,
      prenom: true,
      email: true,
      tel: true,
      [champ]: false, // seul ce champ est activé
    });
  };

  // detecter modification
  const aEteModifie = () => {
    return (
      champs.nom !== initialChamps.nom ||
      champs.prenom !== initialChamps.prenom ||
      champs.email !== initialChamps.email ||
      champs.tel !== initialChamps.tel
    );
  };

  // Champs pour modification
  const [valeurs, setValeurs] = useState({
    date: "",
    nbPersonnes: "",
    occasion: "",
    heure: "",
  });

  const erreurs = validerChampModification(
    valeurs.date,
    valeurs.nbPersonnes,
    valeurs.occasion,
    valeurs.heure
  );

  const trouverRes = async () => {
    if (authCtx.user) {
      const res = await resContext.reservations(authCtx.user.tel);
      if (res.success) {
        setReservations(res.data);
        setPas(false);
      } else {
        setPas(true);
        serErr(res.message);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Confirmer la suppression ?");
    if (!confirmation) return;

    const result = await resContext.supprimer(id);
    if (result.success) {
      alert("Réservation supprimée !");
      await trouverRes();
    } else {
      alert("Erreur : " + result.message);
    }
  };

  const handleClick = (nom) => {
    switch (nom) {
      case "demandeForm":
        setDemande((prev) => !prev);
        break;
      case "estClic":
        setEstClic((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const gererChangement = (e) => {
    const nom = e.target.name;
    const valeur = e.target.value;
    setChamps((champs) => ({ ...champs, [nom]: valeur }));
  };

  const gererChangement2 = (e) => {
    const nom = e.target.name;
    const valeur = e.target.value;
    setValeurs((valeurs) => ({ ...valeurs, [nom]: valeur }));
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

    await trouverRes();

    setDemande(false);
    setTimeout(() => setChargement(false), 1000);
  };

  useEffect(() => {
    if (authCtx.user) {
      setChamps(authCtx.user);
      trouverRes();
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
      <div className="container">
        <UserCard
          champs={champs}
          onChange={gererChangement}
          activerChamp={activerChamp}
          clicks={clicks}
          onClick={() => authCtx.Deconnexion()}
          aEteModifie={aEteModifie}
          enregistrer={() =>{
            alert("Vous ne pouvez pas modifier votre info pour l'instant")
          }}
        />
      </div>

      <div className="reservations-container">
        <div className="head">
          <h1>Vous avez {reservations.length} réservations</h1>
          <i
            className={click ? "bi bi-chevron-up" : "bi bi-chevron-down"}
            onClick={() => setClick(!click)}
          ></i>
        </div>

        {!pasReserves && click && (
          <div className="reserves">
            {reservations.map((res, index) => (
              <ReservationCarte
                key={index}
                details={res.id_reservation}
                supprimer={() => handleDelete(res.id_reservation._id)}
                modifier={() => {
                  handleClick("demandeForm");
                  setId(res.id_reservation._id);
                  setValeurs({
                    date: res.id_reservation.date,
                    nbPersonnes: res.id_reservation.nbPersonnes,
                    occasion: res.id_reservation.occasion,
                    heure: res.id_reservation.heure,
                  });
                }}
              />
            ))}
          </div>
        )}

        {demandeModif && (
          <div className="zoneForm">
            <Form2
              champs={valeurs}
              errs={erreurs}
              annuler={() => setDemande(false)}
              enregister={modifier}
              gererChangement={gererChangement2}
            />
          </div>
        )}
      </div>
    </div>
  );
}
