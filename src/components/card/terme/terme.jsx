import "./terme.css";
import { useState } from "react";

export default function TermsCard({ onAccept }) {
  const [checked, setChecked] = useState(false);

  const handleSubmit = () => {
    if (checked) onAccept();
    else alert("Vous devez accepter les termes pour continuer.");
  };

  return (
   
  <div className="terms-overlay">
    <div className="terms-card">
      <h2>Conditions d'utilisation</h2>
      <div className="terms-content">
        <p>
          En utilisant cette application, vous acceptez nos termes d'utilisation et notre
          politique de confidentialité. Veuillez lire attentivement les conditions
          suivantes...
        </p>
      </div>
      <label className="terms-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        J'accepte les conditions d'utilisation
      </label>
      <button
        className="terms-btn"
        onClick={handleSubmit}
        disabled={!checked}
      >
        Continuer
      </button>
    </div>
  </div>
);

}
