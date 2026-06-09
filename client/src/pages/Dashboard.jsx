import { useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard(){

    const user = JSON.parse(
        localStorage.getItem("user")
    );
    useEffect(()=>{

        const testConnection =
        async()=>{

            try{

                const response =
                await api.get(
                    "/user/profile"
                );

                console.log(
                    response.data
                );

            }

            catch(error){

                console.log(
                    error
                );

            }

        };

        testConnection();

    },[]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return(
<div>
        <h1>

            Dashboard

        </h1>
        <h2>Welcome {user?.name}</h2>
        <p>Email:{user?.email}</p>
        <p>Role:{user?.role}</p>
        
        <button onClick={handleLogout}>LogOut</button>
        <button onClick={()=>
            navigate("/profile")
        }>Profile</button>
</div>
    );

}

export default Dashboard;