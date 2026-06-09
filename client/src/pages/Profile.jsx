import { useState, useEffect } from "react";
import api from "../api/axios";

function Profile() {

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const role = currentUser?.role;

  const [bio, setBio] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [followers, setFollowers] = useState("");
  const [engagementRate, setEngagementRate] = useState("");
  const [niche, setNiche] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleUpdateProfile = async () => {

    try {

      const response = await api.put(
        "/user/profile",
        {
          bio,
          instagramHandle,
          followers,
          engagementRate,
          niche,
          website
        }
      );

      console.log(response.data);

    }

    catch (error) {

      console.log(
        error.response?.data
      );

    }

  };

  useEffect(() => {

    const getProfile = async () => {

      try {

        const response =
          await api.get(
            "/user/profile"
          );

        const user =
          response.data.user;

        setBio(
          user.bio || ""
        );

        setInstagramHandle(
          user.instagramHandle || ""
        );

        setFollowers(
          user.followers || 0
        );

        setEngagementRate(
          user.engagementRate || 0
        );

        setNiche(
          user.niche || ""
        );

        setWebsite(
          user.website || ""
        );

        console.log(
          response.data
        );

      }

      catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );

      }

    };

    getProfile();

  }, []);

  return (

    <div>

      <h1>Profile Page</h1>

      <h3>
        Role : {role}
      </h3>

      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) =>
          setBio(
            e.target.value
          )
        }
      />

      <br />

      {role === "influencer" && (
        <>

          <input
            type="text"
            placeholder="Instagram Handle"
            value={instagramHandle}
            onChange={(e) =>
              setInstagramHandle(
                e.target.value
              )
            }
          />

          <br />

          <input
            type="number"
            placeholder="Followers"
            value={followers}
            onChange={(e) =>
              setFollowers(
                e.target.value
              )
            }
          />

          <br />

          <input
            type="number"
            placeholder="Engagement Rate"
            value={engagementRate}
            onChange={(e) =>
              setEngagementRate(
                e.target.value
              )
            }
          />

          <br />

          <input
            type="text"
            placeholder="Niche"
            value={niche}
            onChange={(e) =>
              setNiche(
                e.target.value
              )
            }
          />

          <br />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfileImage(
                e.target.files[0]
              )
            }
          />

          <br />

        </>
      )}

      {role === "brand" && (
        <>

          <input
            type="text"
            placeholder="Company Website"
            value={website}
            onChange={(e) =>
              setWebsite(
                e.target.value
              )
            }
          />

          <br />

        </>
      )}

      <button
        onClick={
          handleUpdateProfile
        }
      >
        Update Profile
      </button>

    </div>

  );

}

export default Profile;