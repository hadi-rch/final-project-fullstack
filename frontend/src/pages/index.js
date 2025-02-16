import { UserProvider } from "../component/Auth/userContext"
import { BrowserRouter } from 'react-router-dom';
import Routes from "../routes";
import NavbarCustom from "./navbar";
// import { Layout } from 'antd';
// const {Footer} = Layout;
import Footer from "./footer";


const Main = () => {
    return (
        <>
            <UserProvider>
                <BrowserRouter>
                    <NavbarCustom/>
                    <Routes/>
                    <Footer/>
                </BrowserRouter>
            </UserProvider>
        
        </>
    )
}

export default Main