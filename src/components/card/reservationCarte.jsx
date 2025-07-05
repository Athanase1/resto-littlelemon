import "./Confirmation.css"
export default function ReservationCarte({ details }) {
  return (
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
  );
}
