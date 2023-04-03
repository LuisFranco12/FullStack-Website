import { Link } from "react-router-dom"

const Navbar = ({user, setUser}) => {

    const logout = () => {
        localStorage.removeItem("token")
        setUser({})
      };

    return ( 
        <nav>
             <ul>
                <li>
                    <Link to="/story">
                        PenTales
                    </Link>
                </li>

                {
                    user ? 
                    <>
                        <li>
                            <Link to="/create">
                                Write
                            </Link>
                        </li>
                        <li onClick={logout}>
                            <Link to="/login">
                                logout
                            </Link>
                        </li>
                    </> :
                    <>
                        <li>
                            <Link to="/login">
                                Write
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                Register
                            </Link>
                        </li>
                    </>
                }
                
            </ul>
        </nav>
     );
}
 
export default Navbar;