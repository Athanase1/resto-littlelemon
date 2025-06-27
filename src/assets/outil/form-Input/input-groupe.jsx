import "./formGroupe.css";
import { useRef, useState } from "react";

export default function FormGroupe({
  label,
  type,
  handleClick,
   handleClick2,
  name,
  icon,
  estClic,
  data,
  valueConfimer,
  value,
}) {
 
   const [click, setClick] = useState(null)
  return (
    <div className={click ? "form-groupe click": "form-groupe"}>
      <label htmlFor={name}>{label}</label>
      <div className={valueConfimer ? "input-groupe confirmé" : "input-groupe"}>
        <div className="icon">
          <i className={icon}></i>
        </div>

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          readOnly
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
