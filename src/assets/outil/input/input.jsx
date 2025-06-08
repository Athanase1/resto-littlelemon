import "./input.css";
export default function Input({ nom, label, onChange, type}) {
  return (
    <div className="inputContainer">
      <label htmlFor={nom}>{label}</label>
      <input type={type} onChange={onChange} />
    </div>
  );
}
