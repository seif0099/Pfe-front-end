import React,{useState} from 'react'
import { Redirect } from "react-router-dom";

async function Logout() {
  
   
    const [email, setEmail] = useState("");
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const [password, setPassword] = useState("");

      try {
        let item = { email, password };
        let result = await fetch("http://localhost:9000/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        });
        let results = await result.json();
        if (results?.success) {
            localStorage.setItem("user-info", JSON.stringify(results));
            setIsLogoutSuccess(true);
          }
    
      } catch (error) {
        throw alert(error);
      }
      if (isLogoutSuccess) {
        return <Redirect to="/login" />;
      }
    
}

export default Logout