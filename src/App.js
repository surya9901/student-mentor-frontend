import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Mentor from './Components/Mentor/Mentor';
import Students from './Components/Students/Students';
import Multiple from './Components/Multiple Assign/Multiple';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/mentors" element={<Mentor />} exact />
          <Route path="/students" element={<Students />} exact />
          <Route path="/multipleAssign" element={<Multiple />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
