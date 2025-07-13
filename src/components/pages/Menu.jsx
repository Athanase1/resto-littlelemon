import { plats } from "../../assets/data/special";
import CarteMenu from "../card/menu-carte";
import "../styles/menu.css";
export default function Menu() {
  return (
    <div className="menu-container">
      <div className="menus">
        {plats.map((menu) => (
          <CarteMenu menu={menu} key={menu.id} />
        ))}
      </div>
    </div>
  );
}
