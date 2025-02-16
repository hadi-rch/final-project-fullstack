import HomePage from "../src/pages/home";
import Register from "../src/component/Auth/register"; 
import {
    Switch,
    Route,
    Redirect,
 } from "react-router-dom";
import { UserContext, } from "../src/component/Auth/userContext";
import { useContext } from "react";
import Login from "./component/Auth/login";
import DetailProduct from "./component/Product/productDetail";
import ProductForm from "./component/Product/productForm";
import ChangePassword from "./component/Auth/changePassword";
import ProductsTable from "./component/Product/productTable";
import TransactionItem from "./pages/transactionItem";
import Profile from "./pages/profile";
 const Routes = () => {
    const {
        userState:[user],
      } = useContext(UserContext)
        const AdminRoute = ({...rest})=>{//Kembali ke halaman login
            if (user.roles === "ADMIN"){
                return <Route {...rest}/>
            }else{
                return <Redirect to="/login"/>
            }
        }
        const PrivateRoute = ({...rest})=>{//Kembali ke halaman login
            if (user){
                return <Route {...rest}/>
            }else{
                return <Redirect to="/login"/>
            }
        }
        const LoginRoute = ({...rest})=>{
            if (user){
                return <Redirect to="/"/>
            }else{
                return <Route {...rest}/>
            }
        }
    
    return(          
        <div> 
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <LoginRoute exact path="/register">
                        <Register/>
                    </LoginRoute>
                    <LoginRoute exact path="/login">
                        <Login/>
                    </LoginRoute>
                    <Route exact path="/product/:slug">
                        <DetailProduct/>
                    </Route>
                    <PrivateRoute exact path="/product-form">
                        <ProductForm/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/product-form/:id/edit">
                        <ProductForm/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/product-table">
                        <ProductsTable/>
                    </PrivateRoute>
                    {/* <AdminRoute exact path="/change-password">
                        <ChangePassword />
                    </AdminRoute> */}
                    <PrivateRoute exact path="/item">
                        <TransactionItem/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/orders">
                        {/* <OrderPage /> */}
                    </PrivateRoute>
                    <PrivateRoute exact path="/change-password">
                        <ChangePassword />
                    </PrivateRoute>
                    <PrivateRoute exact path="/profile">
                        <Profile />
                    </PrivateRoute>
                    <PrivateRoute exact path="/transaction-item">
                        <TransactionItem />
                    </PrivateRoute>
                    <AdminRoute exact path="/dashboard">
                        <ProductsTable/>
                    </AdminRoute>
                </Switch>
            </div>
        </div>       
    )
 }

 export default Routes