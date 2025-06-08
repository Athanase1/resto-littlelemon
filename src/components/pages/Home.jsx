import {useNavigate} from "react-router-dom"
import Photo1 from "../../assets/images/restauranfood.jpg"
import "../styles/home.css"
import { special } from "../../assets/data/special"
import Special from "../card/special"
import ButtonPlat from "../../assets/outil/buttons/buttonflat"
export default function Home(){
    const navigate = useNavigate()
    return(
        <div className="homecontainer">
           <div className="conteneur1">
            <div className="presentation">
                <div>
                <h1 className="title">Little Lemon</h1>
                <p id="desc">We are a family owned
                Mediterranean restaurant,
                focused on traditional recipes 
                recipes served with a modern 
                twist.
                    </p>
                    </div>
                    <div className="btn">
                    <ButtonPlat text="Reservez une table" icon1="bi-bookmark-star" icon2="bi-arrow-right" onClick={() =>{
                         navigate("/reservation")
                    }}/>
                    </div>
                    
                </div>
                <div className="img">
                    <img src={Photo1} alt="image d'un plat" id="plat"/>
                </div>
           </div>

           <div className="conteneur2">
            <div className="head">
                <h1 className="subtitle">This weeks specials!</h1>
                <div className="btn">
                 <ButtonPlat text="Commandez en ligne"  icon2="bi-arrow-right" onClick={() =>{
                         navigate("/order")
                    }}/>
                    </div>
            </div>
            
            <div className="special-menu">
                {special.map((item) =>(
                    <Special titre={item.titre} prix={item.prix} desc={item.desc} key={item.id} img={item.img} onclick={() =>{
                        navigate("/order")
                    }}/>
                ))}
            </div>
           </div>
        </div>
    )
}