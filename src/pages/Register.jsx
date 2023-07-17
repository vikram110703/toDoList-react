import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        ` ${server}/users/new `,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setTimeout(() => {
        toast.success(data.message);
        setIsAuthenticated(false);
        setLoading(false);
        setEmail("");
        setPassword("");
      }, 500); // Delay of 1 second

    } catch (error) {
      setTimeout(() => {
        toast.error(error.response.data.message);
        setIsAuthenticated(false);
        setLoading(false);
        setPassword("");
      }, 500); // Delay of 1 second
    
    }
  };
  if(loading)return<Loader/>;

  /* yha se me direct login nahi karna chahta that's why i comment out this (below) */ 

  // if (isAuthenticated) return <Navigate to={"/"} />;


  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
