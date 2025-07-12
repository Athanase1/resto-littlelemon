import { plats } from "../../assets/data/special"
import "../styles/menu.css"
export default function Menu(){
    return(
        <div className="menu-container">

      <div className="menus">
  <table className="menu-table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Nom du plat</th>
        <th>Description</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      {plats.map((plat) => (
        <tr key={plat.id}>
          <td><img src={plat.img} alt={plat.titre} style={{ width: "80px", borderRadius: "8px" }} /></td>
          <td>{plat.titre}</td>
          <td>{plat.desc}</td>
          <td>{plat.prix}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div> 
    )
}