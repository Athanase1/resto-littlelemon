import "./formGroupe.css";
import { useRef, useState } from "react";

export default function FormGroupe({
  label,
  type,
  handleClick,
  name,
  icon,
  estClic,
  data,
}) {
  const [value, setValue] = useState("")
  return (
    <div className="form-groupe">
      <label htmlFor={name}>{label}</label>
      <div className="input-groupe">
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

      {data && data.length > 0 && (
        <div className={estClic ? "liste" : "cacherListe"}>
          {data.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setValue(item);
                handleClick();
              }}
            >
              {item}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
