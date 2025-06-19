import { useState } from "react";
import ButtonPlat from "../buttons/buttonflat";
import Input from "../input/input";
import "./form.css";
import { UserContext } from "../../../store/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/layout/Loading";

export default function Form({ authen }) {
  const [seConnecte, setSeconnecte] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

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
      if (loading) return <LoadingScreen text="Connexion en cours patientez" />;

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
          />
          <Input
            label="Prénom"
            nom="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <Input
            label="Numero"
            nom="numero"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <Input
            label="Email"
            nom="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              />
              <Input
                label="Prénom"
                nom="prenom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <Input
                label="Numero"
                nom="numero"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </>
          )}
          <Input
            label="Email"
            nom="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Mot de passe"
            nom="motPasse"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
      <ButtonPlat
        icon1="bi-person"
        text={seConnecte ? "Se connecter" : "S'incrire"}
        icon2="bi-arrow-right"
        type="submit"
        onClick={gestionSubmission}
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
