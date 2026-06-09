import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();
    const handleSignup = async()=>{
        try {
            const response = await api.post(
                "/auth/signup",
            {
                name,
                email,
                password,
                role
            }
        );
        console.log(response.data);
        navigate("/login");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    return(
        <div>
        <h1>Signup Page</h1>
        <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <br />
        <input type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <br />
        <input type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
         />
         <br />
         <select
         value={role}
         onChange={(e)=>setRole(e.target.value)}
         >
            <option value="brand">Brand</option>
            <option value="influencer">Influencer</option>
         </select>
         <br />
         <button onClick={handleSignup}>Signup</button>
        </div>
    );
}
export default Signup;