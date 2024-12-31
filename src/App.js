import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './view/Login';
import Driver from './view/Driver';
import Reservation from './view/Reservation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Driver' element={<Driver/>}/>
        <Route path='/Reservation' element={<Reservation/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
