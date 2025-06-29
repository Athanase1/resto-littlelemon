import "./formGroupe.css";
import { useRef, useState } from "react";

export default function FormGroupe({
  label,
  type,
  handleClick,
  name,
  icon,
  estClic,
  valueConfimer,
  value,
  erreur
}) {
 
   const [click, setClick] = useState(null)
  return (
    <div className="form-groupe">
      <label htmlFor={name}>{label} <span>{erreur}</span></label>
      <div className={valueConfimer ? "input-groupe click" : "input-groupe"}>
        <div className="icon">
          <i className={icon}></i>
        </div>

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          readOnly
          className={erreur && "error"}
        />

        <div className="icon">
          <i
            onClick={handleClick}
            className={estClic ? "bi bi-chevron-up" : "bi bi-chevron-down"}
          ></i>
        </div>
      </div>
    </div>
  );
}
