import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async()=>{
        try {
            const response = await api.post("/auth/login",
                {
                    email,
                    password
                }
            );
            console.log(response.data);
            localStorage.setItem(
                "token",
              
                response.data.token
            );
            localStorage.setItem(
                  "user",
                JSON.stringify(
                    response.data.user
                )
            )
            navigate("/dashboard");
            console.log(localStorage.getItem("token"));
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    const navigate = useNavigate();
    return(
        <div>
            <h1>
                Login
            </h1>
            <input type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e)=>
            setEmail(e.target.value)
            }
            />
            <br></br>
            <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>
                setPassword(
                    e.target.value
                )
            }
            />
            <br></br>
            <button onClick={handleLogin}>
                LogIn
            </button>
        </div>
    );
    
    
}


export default Login;