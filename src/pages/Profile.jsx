import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import userIcon from "../assets/userIcon.svg";
import Loader_profile from "../components/Loader_profile";

const Profile = () => {
  const { isAuthenticated, loading, setLoading, user } = useContext(Context);
  useEffect(() => {
    setLoading(true);
  }, [isAuthenticated]);

  setTimeout(() => {
    setLoading(false);
  }, 300);


  if (loading) return <Loader_profile />;
  if (isAuthenticated) {
    return (
      <div className="profile">
        <img src={userIcon} alt="Profile" />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  }
  return (
    <div className="profile">
      <img src={userIcon} alt="Profile" />
      <h1>UserName</h1>
      <p>user@gmail.com</p>
    </div>
  );

};

export default Profile;
