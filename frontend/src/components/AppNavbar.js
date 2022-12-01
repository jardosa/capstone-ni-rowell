import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Navigate, Link } from 'react-router-dom';
import UserContext from "../UserContext";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import '../components/AppNavbar.css';


export default function AppNavbar () {

    const { user } = useContext(UserContext);

    const [goToRegister, setGoToRegister] = useState(false);

    const [goToLogin, setGoToLogin] = useState(false);

    //const [logout, setLogout] = useState(true);
    

    if (goToLogin) {
        return <Navigate to='/login'/>
    }

    if (goToRegister) {
        return <Navigate to='/register'/>
    }
    
    //if (!logout) {
      //  return <Navigate to='/'/>
    //}


    return (
        <Navbar className="navbar row">
            <Container className="col-12 col-md-3">
                <Navbar.Brand className="navbar-brand">
                    <img src="../../images/Pelican.jpg" alt="logo"/>
                </Navbar.Brand>
            </Container>
            <Container className="col-12 col-md-6 mt-2 mt-md-0">
                <Container className="input-group">
                    <input type="text" id="search_field" className="form-control" placeholder="Enter Product Name"/>
                    <Nav className="input-group-append btncont">
                        <button id="search_btn" className="btn">
                            <FaSearch/>
                        </button>
                    </Nav>
                </Container>
            </Container>
            <Nav className="col-12 col-md-3 mt-4 mt-md-0 text-center">


                {(user.id !== null) ?
                //<button className="btn" id="logout_btn" onClick={() => {setLogout(true)}}>Logout</button>
                <Nav.Link className="btn logout" type="btn" as={Link} to="/logout">Logout</Nav.Link>
                :
                <>
                <button className="btn login" id="login_btn" onClick={() => {setGoToLogin(true)}}>Login</button>
                <button className="btn register" id="register_btn" onClick={() => {setGoToRegister(true)}}>Register</button>
                </>
                }

            </Nav>

        </Navbar>
    )
}