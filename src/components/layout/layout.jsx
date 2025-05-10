import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./layout.css"
import { useState } from "react";

export default function LayOut(){
    const [display, setDisplay] = useState(false);
    
    function handleClick() {
      setDisplay(!display);
    }
    
    return(
        <div className="layout">
        <Header display={display} onclick={handleClick}/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        </div>
    )
}