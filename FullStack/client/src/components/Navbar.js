import { Link } from "react-router-dom"
import {LinkContainer} from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NavBar = ({user, setUser}) => {

    const logout = () => {
        localStorage.removeItem("token")
        setUser({})
      };

    return ( 
        <Navbar style={{}} bg="dark" variant="dark" expand="lg">
            <Container className="d-flex">
            <LinkContainer to="/">
                <Navbar.Brand>PenTails</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {
                        user ? 
                            <>
                                <LinkContainer to="/create">
                                    <Nav.Link>Create</Nav.Link>
                                </LinkContainer>
                                <LinkContainer onClick={logout} to="/login">
                                    <Nav.Link>Logout</Nav.Link>
                                </LinkContainer>
                                <Navbar.Text>
                                    Signed in as: <span style={{color: 'white'}}> {user} </span>
                                </Navbar.Text>
                            </>
                        :
                            <>
                                <LinkContainer to="/login">
                                    <Nav.Link>Create</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <Nav.Link>Register</Nav.Link>
                                </LinkContainer>
                            </>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
     );
}
 
export default NavBar;