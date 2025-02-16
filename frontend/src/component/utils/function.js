import { Modal } from "antd"
// import {  useHistory } from "react-router-dom";

export const logout = ({setUser, status="logout-set"})=>{
// const history = useHistory();   
 if (status === "expired") {
        Modal.error({
            title:`Login Expired`,
            content:`Login Again to Continue`
        })
    }
    setUser(null)
    localStorage.clear()
    // history.push("/")
    // if(user.token)
}