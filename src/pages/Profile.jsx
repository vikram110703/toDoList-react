import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import userIcon from "../assets/userIcon.svg";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  
  return loading ? (
    <Loader />
  ) : (
    <div className="profile">
      <img src={userIcon} alt="Profile" />
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
