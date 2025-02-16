import { useContext,} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../component/Auth/userContext";
import { Button} from 'antd';

const NavbarItem = () => {
    const {
        userState:[user, setUser],
        loadingState:[confirmLoading, setConfirmLoading]
      } = useContext(UserContext)
    const history = useHistory();

    const logout = ()=>{

        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            if (confirmLoading === false) {
                setUser(null)
                localStorage.clear()
                history.push("/login")
            }
        }, 2000);
    }

    return (
        <nav className="custom-nav-light">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {
                user ? (
                    <>
                <li>
                    <Link to="/product-table">Dashboard</Link>
                </li>
                <li>
                    <Link to="/orders">Orders</Link>
                </li>
                <li>
                    <Link to="/change-password">Change Password</Link>
                </li>
               
                <li>
                    <strong style={{ right: '100px',top:'4px', position: 'absolute', margin:'0px 10px 0 0' }}>Hallo {user.username}</strong>
                    <Button loading={confirmLoading} type="primary" size="large" danger onClick={logout} style={{top:'4px',right:'0', position: 'absolute', margin:'0px 10px 0 0'}}>Logout</Button>
                </li>
                    </>
                ):
                (<>      
                    <li>
                    
                    </li>          

                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </>)}
            </ul>
            
        </nav>
    )
}

export default NavbarItem