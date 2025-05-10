import {HashRouter as Router, Route,Routes} from "react-router-dom"
import LayOut from "./components/layout/layout"
import Home from "./components/pages/Home"
import 'bootstrap-icons/font/bootstrap-icons.css';
import OnlineOrder from "./components/pages/Online Order";


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<LayOut/>}>
          <Route index path="/" element={<Home/>}/>
          <Route path="/order" element={<OnlineOrder/>}/>
        </Route>
      </Routes>
     </Router>
  )
}

export default App
