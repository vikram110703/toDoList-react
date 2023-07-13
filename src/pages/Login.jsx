import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import Loader from "../components/Loader";



const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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
        setIsAuthenticated(true);
        setLoading(false);
        setPassword("");
      }, 1000); // Delay of 1 second 

    } catch (error) {
      setTimeout(() => {
        toast.error(error.response.data.message);
        setLoading(false);
        setPassword("");
        setIsAuthenticated(false);
      }, 1000);

    }
  };

  const handleResend = async () => {
    const isRegistered = true;
    try {
      // Perform the necessary API call or functionality to check if the email is registered

      // Assuming the email is registered for demonstration purposes

      if (isRegistered) {
        // Perform the redirect to the verify page here
        // Example using React Router:
        // <Navigate to="/verify" />
        toast.success("Email is already registered. Redirecting to verify page.");
        
      } else {
        toast.error("Email is not registered.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setShowEmailInput(false);
   
  };

  const renderResendEmail = () => {
    if (!showEmailInput) {
      setShowEmailInput(true);
      console.log("input",showEmailInput);
      return (
        <button className="resendEmail" onClick={() => setShowEmailInput(true)}>
          changed
        </button>
      );
      
    } else {
      return (
        <div className="emailInputContainer">
          <input
            type="email"
            placeholder="example@gmail.com"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button onClick={handleResend}>Resend</button>
        </div>
      );
    }
  };



  if (loading) return <Loader />;
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)
            }
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>New to this App</h4>
          <Link to="/register">Sign Up</Link>
        </form>
        <div className="resendBtn-Container">
          <button className="resendEmail" onClick={renderResendEmail} >Resend Confirmation</button>
        </div>
      </section>
    </div>
  );
};

export default Login;


