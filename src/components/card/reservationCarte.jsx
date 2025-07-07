import "./reservationCarte.css";
import ButtonPlat from "../../assets/outil/buttons/buttonflat";
export default function ReservationCarte({
  details,
  supprimer,
  modifier,
}) {
  return (
    <div className="reserve-container">
      <div className="header">
        <h1>Date:</h1>
        <h1 id="date">{details.date}</h1>
      </div>
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
        <ButtonPlat
          icon2="bi-pencil-square"
          text="Modifier"
          onClick={modifier}
        />
      </div>
    </div>
  );
}
