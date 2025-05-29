import {useNavigate} from "react-router-dom"
import Photo1 from "../../assets/images/restauranfood.jpg"
import "../styles/home.css"
import { special } from "../../assets/data/special"
import Special from "../card/special"
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
                    <button id="reserve" onClick={()=>{
                        navigate("/reservation")
                    }}>Reservez une table</button>
                </div>
                <div className="img">
                    <img src={Photo1} alt="image d'un plat" id="plat"/>
                </div>
           </div>

           <div className="conteneur2">
            <div className="head">
                <h1 className="subtitle">This weeks specials!</h1>
                <button onClick={() =>{
                    navigate("/order")
                }}>Online Order</button>
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