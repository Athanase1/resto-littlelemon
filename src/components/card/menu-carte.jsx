import "./menu-carte.css";
export default function CarteMenu({ menu }) {
  return (
    <div className="carte-Menu">
      <div className="details">
        <img src={menu.img} alt={menu.nom} />
        <h1 id="nom">{menu.titre}</h1>
        <h1 id="prix">{menu.prix}</h1>
      </div>
      <p id="descrip">{menu.desc}</p>
    </div>
  );
}
