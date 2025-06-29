import "../styles/home.css"
export default function Menu(){
    return(
        <div className="links">
        <div className="cat">
             <h3>Categories</h3>
             <h1 className="plus">See all &gt;</h1>
        </div>
       
        <div className="bnts">
        <button>Lunch</button>
        <button>Mains</button>
        <button>Desserts</button>
        <button>A la carte</button>
        <button>Specials</button>
        <button>Online</button>
        </div>
    </div> 
    )
}