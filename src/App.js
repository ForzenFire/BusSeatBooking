import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './view/Login';
import Driver from './view/Driver';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Driver' element={<Driver/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
