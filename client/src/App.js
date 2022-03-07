import './App.css';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home.jsx';
import NavBar  from './components/NavBar';
import Detalle from './components/Detalle';
import Creation from './components/Creation/Creation';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    {/* <Route path='/' element={<NavBar/>} /> */}
    <Route path='/' element={<LandingPage />} />
    <Route path='/home' element={<Home />}/>
    <Route path='/home/:id' element={<Detalle/>}/>
    <Route path='/dog' element={<Creation/>}/>
    </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
