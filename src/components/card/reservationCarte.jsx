import "./reservationCarte.css";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
export default function ReservationCarte({
  details,
  supprimer,
  modifier,
}) {
 function reservationEstExpiree() {
  const [year, month, day] = details.date.split("-");
  const [hour, minute] = details.heure.split(":");
  const dateHeure = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute)
  );
  return dateHeure < new Date();
}


  return (
    <div className={reservationEstExpiree ? "expire reserve-container" : "reserve-container"}>
      <div className="header">
        <h1>Date:</h1>
        <h1 id="date">{details.date}</h1>
      </div>
      {reservationEstExpiree && <p id="exp">expirée</p>}
      <div className="details">
        <div className="detail">
          <i className="bi bi-people-fill"></i>
          <h1>{details.nbPersonnes || "ND"} personnes</h1>
        </div>
        <div className="detail">
          <i className="bi bi-cup-straw"></i>
          <h1>{details.occasion || "ND"}</h1>
        </div>
        <div className="detail">
          <i className="bi bi-clock"></i>{" "}
          <h1>{details.heure || "ND"}</h1>
        </div>
      </div>
      <div className="resbtns">
        <ButtonPlat icon2="bi-trash" text="Supprimer" onClick={supprimer} />
       {!reservationEstExpiree &&  <ButtonPlat
          icon2="bi-pencil-square"
          text="Modifier"
          onClick={modifier}
        />}
      </div>
    </div>
  );
}
