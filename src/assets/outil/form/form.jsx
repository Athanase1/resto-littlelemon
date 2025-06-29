import { useState } from "react";
import ButtonPlat from "../buttons/buttonflat";
import Input from "../input/input";
import "./form.css";
import { UserContext } from "../../../store/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/layout/Loading";
import { validerConnexion, validerForm } from "../../../service/validerInputs";

export default function Form({ authen }) {
  const [seConnecte, setSeconnecte] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [errs, setErrs] = useState([]);
  const erreurs = validerForm({
    nom,
    prenom,
    email,
    tel,
  });
 /* const erreurCon = validerConnexion({
    email,
    password,
  });*/

  const authCtx = useContext(UserContext);
  const navigate = useNavigate();
  const gestionSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
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
        // Reset des champs seulement si succès
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
      console.error("Erreur lors de l'envoi :", err);
      setError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <LoadingScreen text="Connexion en cours patientez" />;
  return (
    <div className="form-container">
      <>
        {authen && <h1>Connectez Vous !</h1>}
        {error && <h1>{error}</h1>}
      </>
      {!authen && (
        <>
          <Input
            label="Nom"
            nom="nom"
            value={nom}
            onChange={(e) => {
              setNom(e.target.value);
            }}
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
            label="Numero"
            nom="numero"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            erreur={errs.tel}
          />
          <Input
            label="Email"
            nom="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            erreur={errs.email}
          />
        </>
      )}
      {authen && (
        <>
          {!seConnecte && (
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
                label="Numero"
                nom="numero"
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
            nom="motPasse"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            erreur={errs.password}
          />
        </>
      )}
      <ButtonPlat
        icon1="bi-person"
        text={seConnecte ? "Se connecter" : "S'incrire"}
        icon2="bi-arrow-right"
        type="submit"
        onClick={() => {
          if (Object.keys(erreurs).length > 0) {
            setErrs(erreurs);
            return;
          }
          gestionSubmission();
        }}
      />
      {authen && (
        <p
          className="toggle-auth"
          onClick={() => {
            setSeconnecte((prev) => !prev);
            setError(null);
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
