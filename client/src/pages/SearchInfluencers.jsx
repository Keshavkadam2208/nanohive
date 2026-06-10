import { useState } from "react";
import api from "../api/axios";
function SearchInfluencers(){
    const[niche, setNiche] = useState("");
    const[followers, setFollowers] = useState("");
    const[engagement, setEngagement] = useState("");
    const[users, setUsers] = useState([]);
    const handleSearch = async()=>{
        try {
            const response = await api.get(`/user/search?niche=${niche}&followers=${followers}&engagement=${engagement}`);
            setUsers(response.data.users);
            console.log(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

     return (

        <div>

            <h1>
                Search Influencers
            </h1>

            <input
                type="text"
                placeholder="Niche"
                value={niche}
                onChange={(e)=>
                    setNiche(
                        e.target.value
                    )
                }
            />

            <br />

            <input
                type="number"
                placeholder="Minimum Followers"
                value={followers}
                onChange={(e)=>
                    setFollowers(
                        e.target.value
                    )
                }
            />

            <br />

            <input
                type="number"
                placeholder="Minimum Engagement"
                value={engagement}
                onChange={(e)=>
                    setEngagement(
                        e.target.value
                    )
                }
            />

            <br />

            <button
                onClick={handleSearch}
            >
                Search
            </button>

            <hr />

            {users.map((user)=>{

                return(

                    <div
                        key={user._id}
                    >

                        <h3>
                            {user.name}
                        </h3>

                        <p>
                            {user.bio}
                        </p>

                        <p>
                            Instagram:
                            {user.instagramHandle}
                        </p>

                        <p>
                            Followers:
                            {user.followers}
                        </p>

                        <p>
                            Engagement:
                            {user.engagementRate}
                        </p>

                        <p>
                            Niche:
                            {user.niche}
                        </p>

                        <hr />

                    </div>

                );

            })}

        </div>

    );



}
export default SearchInfluencers;