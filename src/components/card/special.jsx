import "./special.css"
export default function Special({img,titre,prix,desc, onclick}){
    return(
       <div className="card" onClick={onclick}>
            <img src={img} alt={titre} className="card-img" />
            <div className="card-body">
                <div className="card-head">
                    <h1 className="titre">{titre}</h1>
                    <h3 className="prix">{prix}</h3>
                </div>
                <p className="desc">{desc}</p>
            </div>
       </div> 
    )
}