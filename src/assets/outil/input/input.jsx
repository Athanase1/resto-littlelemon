import "./input.css";
export default function Input({ nom, value, label, onChange, type, erreur, placeholder}) {
  const invalide = "entrée invalide"
  return (
    <div className="inputContainer">
      <label htmlFor={nom}>{label} <span>{erreur}</span></label>
      <input className={invalide && "error"} type={type} onChange={onChange} name={nom} value={value}  placeholder={placeholder}/>
    </div>
  );
}
