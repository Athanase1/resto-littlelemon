import "./form2.css";
import Input from "../input/input";
import ButtonPlat from "../buttons/buttonflat";

export default function Form2({
  errs,
  champs,
  gererChangement,
  annuler,
  enregister,
}) {
  return (
    <form
      className="form-cont"
      onSubmit={(e) => {
        e.preventDefault();
        enregister(); // ✅ appel sécurisé de la méthode d'enregistrement
      }}
    >
      <div className="form">
        <Input
          label="Date"
          nom="date"
          value={champs.date}
          onChange={gererChangement}
          erreur={errs.date}
        />
        <Input
          label="Nombre de personnes"
          nom="nbPersonnes"
          value={champs.nbPersonnes}
          onChange={gererChangement}
          erreur={errs.nbPersonnes}
        />
        <Input
          label="Occasion"
          nom="occasion"
          value={champs.occasion}
          onChange={gererChangement}
          erreur={errs.occasion}
        />
        <Input
          label="Heure"
          nom="heure"
          value={champs.heure}
          onChange={gererChangement}
          erreur={errs.heure}
        />
      </div>
      <div className="resbtns">
        <ButtonPlat icon2="bi-trash" text="Annuler" onClick={annuler} />
        <ButtonPlat
          icon2="bi-pencil-square"
          text="Enregistrer"
          type="submit" // ✅ bouton de type submit pour éviter le warning
        />
      </div>
    </form>
  );
}
