import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LayOut from "./components/layout/layout";
import Home from "./components/pages/Home";
import "bootstrap-icons/font/bootstrap-icons.css";
import OnlineOrder from "./components/pages/Online Order";
import Reservation from "./components/pages/Reservation";
import About from "./components/pages/about";
import Panier from "./components/pages/Panier";
import Profile from "./components/pages/Profile";
import LaySansHeader from "./components/layout/LayoutSansHeader";
import Login from "./components/pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          
          
        </Route>
        <Route element={<LaySansHeader/>}>
          <Route path="/panier" element={<Panier />} />
          <Route path="/order" element={<OnlineOrder />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/authentification" element={<Login/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
