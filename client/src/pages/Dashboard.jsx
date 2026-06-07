import { useEffect } from "react";
import api from "../api/axios";

function Dashboard(){

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

    return(

        <h1>

            Dashboard

        </h1>

    );

}

export default Dashboard;