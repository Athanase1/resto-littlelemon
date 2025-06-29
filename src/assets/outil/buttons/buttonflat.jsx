import "./buttonPlat.css"
export default function ButtonPlat({ text, icon1, icon2, onClick, type, disabled}) {
  return (
    <button className="btnContainer" onClick={onClick} type={type} disabled={disabled}> 
      <i className={`bi ${icon1}`}></i>
      {text}
      <i className={`bi ${icon2}`}></i>
    </button>
  );
}
