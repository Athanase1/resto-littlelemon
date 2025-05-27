import {HashRouter as Router, Route,Routes} from "react-router-dom"
import LayOut from "./components/layout/layout"
import Home from "./components/pages/Home"
import 'bootstrap-icons/font/bootstrap-icons.css';
import OnlineOrder from "./components/pages/Online Order";
import Reservation from "./components/pages/Reservation";
import Menu from "./components/pages/Menu";
import Login from "./components/pages/Login";
import About from "./components/pages/about";


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<LayOut/>}>
          <Route index path="/" element={<Home/>}/>
          <Route path="/order" element={<OnlineOrder/>}/>
          <Route path="/about" element={<About/>}/>
           <Route path="/login" element={<Login/>}/>
            <Route path="/menu" element={<Menu/>}/>
             <Route path="/reservation" element={<Reservation/>}/>
        </Route>
      </Routes>
     </Router>
  )
}

export default App
