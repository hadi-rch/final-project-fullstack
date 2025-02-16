import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [confirmLoading, setConfirmLoading] = useState(false);
  

  let state = {
    userState:[user, setUser],
    loadingState:[confirmLoading, setConfirmLoading]
  }
    


  return (
    <UserContext.Provider value={state}>
      {props.children}
    </UserContext.Provider>
  );
};










// [user, setUser,confirmLoading, setConfirmLoading]