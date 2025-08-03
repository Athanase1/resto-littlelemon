import { useState, useContext } from "react";
import ButtonPlat from "../buttons/buttonflat";
import Input from "../input/input";
import "./form.css";
import { UserContext } from "../../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/layout/Loading";
import { validerConnexion, validerForm, validerMotDePasse } from "../../../service/validerInputs";

export default function Form({ authen }) {
  const [seConnecte, setSeconnecte] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [errs, setErrs] = useState({});

  const authCtx = useContext(UserContext);
  const navigate = useNavigate();

  const gestionSubmission = async (e) => {
    e.preventDefault();
    setLoadingForm(true);
    setError(null);
    setErrs({});

    let erreurs = {};

    if (seConnecte) {
      erreurs = validerConnexion({ email, password });
    } else {
      erreurs = validerForm({ nom, prenom, email, tel,password });
    }

    if (Object.keys(erreurs).length > 0) {
      setErrs(erreurs);
      setLoadingForm(false);
      return;
    }

    try {
      let result;
      if (seConnecte) {
        result = await authCtx.connexion(email, password);
      } else {
        result = await authCtx.inscriptionEtConnexion(
          nom,
          prenom,
          email,
          tel,
          password
        );
      }

      if (result?.success) {
        setError(null);
        setNom("");
        setPrenom("");
        setTel("");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        setError(result?.message || "Erreur inconnue");
      }
    } catch (err) {
      setError("Une erreur est survenue, veuillez réessayer.");
      alert(err)
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <div className="form-container">
      {authen && <h1>Connectez-vous !</h1>}
      {error && <p className="message-erreur">{error}</p>}

      {loadingForm && <LoadingScreen text="Connexion en cours, patientez..." />}

      <form onSubmit={gestionSubmission}>
        {(!authen || !seConnecte) && (
          <>
            <Input
              label="Nom"
              nom="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              erreur={errs.nom}
            />
            <Input
              label="Prénom"
              nom="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              erreur={errs.prenom}
            />
            <Input
              label="Numéro"
              nom="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              erreur={errs.tel}
            />
          </>
        )}

        <Input
          label="Email"
          nom="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          erreur={errs.email}
        />

        <Input
          label="Mot de passe"
          nom="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          erreur={errs.password}
        />

        <ButtonPlat
          icon1="bi-person"
          text={seConnecte ? "Se connecter" : "S'inscrire"}
          icon2="bi-arrow-right"
          type="submit"
        />
      </form>

      {authen && (
        <p
          className="toggle-auth"
          onClick={() => {
            setSeconnecte((prev) => !prev);
            setError(null);
            setErrs({});
          }}
        >
          {seConnecte
            ? "Pas encore inscrit ? S'inscrire"
            : "Déjà un compte ? Se connecter"}
        </p>
      )}
    </div>
  );
}
