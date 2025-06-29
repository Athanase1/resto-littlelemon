import "./confirmation.css"
export default function Confirmation({message, onClick}){
    return(
        <div className="confirmation">
            <i className="bi bi-x" onClick={onClick}></i>
            <div className="iconetmess">
                <i className="bi bi-check-circle" onClick={onClick} ></i>
                <h1>{message}</h1>
            </div>
        </div>
    )
}