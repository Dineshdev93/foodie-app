import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext();

export const Userprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const loggedUser = async () => {
    try {
      const token = localStorage.getItem("authtoken");

      if (token) {
        const response = await axios.get(
          "http://localhost:8000/userAuth/api/verifyUser",
          {
            headers: { authorization: token },
          }
        );
        setUser(response.data);
        console.log("Token set");
        
      }
    } catch (error) {
      console.log(error + "Token not set");
      setUser(null)
    }
  };
  useEffect(() => {
    loggedUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser,loggedUser}}>
      {children}
    </UserContext.Provider>
  );
};
