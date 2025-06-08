import Input from "../input/input";

export default function Form({ seConnecte, authen}) {
  return (
    <>
      {!authen && (
        <>
          <Input label="Nom" nom="nom" onChange={() => {}} />
          <Input label="Prénom" nom="prenom" onChange={() => {}} />
          <Input label="Numero" nom="numero" onChange={() => {}} />
          <Input label="Email" nom="email" type="email" onChange={() => {}} />
        </>
      )}
      {authen && (
        <>
          {!seConnecte && (
        <>
          <Input label="Nom" nom="nom" onChange={() => {}} />
          <Input label="Prénom" nom="prenom" onChange={() => {}} />
          <Input label="Numero" nom="numero" onChange={() => {}} />
          <Input label="Email" nom="email" type="email" onChange={() => {}} />
        </>
      )}
          <Input label="Email" nom="email" type="email" onChange={() => {}} />
        <Input
          label="Mot de passe"
          nom="motPasse"
          type="password"
          onChange={() => {}}
        />
      
      
        </>
      )}
      
    </>
  );
}
