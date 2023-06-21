import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import userIcon from "../assets/userIcon.svg";

const Profile = () => {
  const { isAuthenticated, loading, setLoading, user } = useContext(Context);
  useEffect(() => {
    setLoading(true);
  }, [isAuthenticated]);

  setTimeout(() => {
    setLoading(false);
  }, 400);


  if (loading) return <Loader />;
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
