import "./input.css";
export default function Input({ nom, value, label, onChange, type}) {
  return (
    <div className="inputContainer">
      <label htmlFor={nom}>{label}</label>
      <input type={type} onChange={onChange} name={nom} value={value} />
    </div>
  );
}
