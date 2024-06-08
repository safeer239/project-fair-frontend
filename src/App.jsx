import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Project from './Pages/Project';
import Dashboard from './Pages/Dashboard';
import Auth from './Components/Auth';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/register' element={<Auth register/>} />
        <Route path='/project' element={<Project/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='*' element={<PageNotFound/>} />
       
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;
