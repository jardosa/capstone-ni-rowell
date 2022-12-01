import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import Logout from './pages/Logout';
import DashBoard from './components/DashBoard';
import Products from './pages/Products';
import ProductView from './components/ProductView';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }  

  useEffect(()=>{
    fetch('http://localhost:4000/users/details',{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);

      if(typeof data._id !== "undefined"){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });
      }else{
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  },[]);

  return (
    <UserProvider value = {{user, setUser, unsetUser}}>
      <Router>
        <div className='App'>
          <AppNavbar/>
          <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="products/:productId" element={<ProductView/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="*" element={<Error/>}/>
            <Route path="/admin" element={<DashBoard/>}/>
          </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App;
