import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home.jsx';
import NewDog from "./components/NewDog/NewDog.jsx";
import DetallePerrito from './components/Detalle/DetallePerrito.jsx';
import Error404 from "./components/Error404/Error404.jsx"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Home/>} ></Route>
          <Route path="/dog" element={<NewDog/>} ></Route>
          <Route path="/dogs/:id" element={<DetallePerrito/>} ></Route>
          <Route path="*" element={<Error404/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
