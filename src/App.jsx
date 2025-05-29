import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LayOut from "./components/layout/layout";
import Home from "./components/pages/Home";
import "bootstrap-icons/font/bootstrap-icons.css";
import OnlineOrder from "./components/pages/Online Order";
import Reservation from "./components/pages/Reservation";

import Login from "./components/pages/Login";
import About from "./components/pages/about";
import Panier from "./components/pages/Panier";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index path="/" element={<Home />} />
          <Route path="/order" element={<OnlineOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/panier" element={<Panier />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
