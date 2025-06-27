import ButtonPlat from "../../assets/outil/buttons/buttonflat";
import "./Confirmation.css";
export default function ConfirmationCarte({ nom, prenom, details, tel, onClick, onClick2 }) {
  return (
    <div className="Confirmation">
        
      <div className="en-tete">
        <h1>{`${nom} ${prenom}`}</h1>
        <h1>
          <i className="bi bi-telephone"></i>
          {tel}
        </h1>
      </div>
      <div className="items">
        <div className="item">
          <i className="bi bi-calendar"></i>
          <h1>{details.date}</h1>
        </div>
        <div className="item">
          <i className="bi bi-people"></i>
          <h1>{`${details.nbPersonnes} personnes`}</h1>
        </div>
        <div className="item">
          <i className="bi bi-cup-straw"></i>
          <h1>{details.occasion}</h1>
        </div>
        <div className="item">
          <i className="bi bi-clock"></i>
          <h1>{details.heure}</h1>
        </div>
      </div>
    <div className="buttons">
      <ButtonPlat icon2="bi-check-circle" text="Reservez" onClick={onClick}/>
      <ButtonPlat icon2="bi-pencil-square" text="Modifier" onClick={onClick2} />
      </div>
    </div>
  );
}
