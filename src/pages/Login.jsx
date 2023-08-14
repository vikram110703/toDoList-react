import axios from "axios";
import React, { useContext, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import Loader from "../components/Loader";



const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmationForm, setShowConfirmationForm] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [path,setPath]=useState('');

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
        setIsAuthenticated(true);
        setPassword("");
        toast.success(data.message);
        setLoading(false);
      }, 300); // Delay of 0.5 second 

    } catch (error) {
      setTimeout(() => {
        setIsAuthenticated(false);
        setPassword("");
        toast.error(error.response.data.message);
        setLoading(false);
      }, 300);

    }
  };

  const openConfirmationForm = (newPath) => {
    setPath(newPath);
    setShowConfirmationForm(true);
    setBlurBackground(true);
  };

  const closeConfirmationForm = () => {
    setShowConfirmationForm(false);
    setBlurBackground(false);
  };

  //.................................. handle resend comfirmaion Email.............................................
  const handleConfirmationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("Email:", newEmail);
    setNewEmail(e.target.value);

    try {

      const { data } = await axios.post(
        `${server}/users/${path}`,
        {
          newEmail,
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
      }, 200);
    }
    catch (error) {
      setTimeout(() => {
        toast.error(error.response.data.message);
        setIsAuthenticated(false);
        setLoading(false);
      }, 200);
    }
  };


  if (loading) return <Loader />;
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className={`login`}>
      <section className={blurBackground ? "blur" : ""}>
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
          <button className="resendEmail" onClick={()=>openConfirmationForm('resendConfirmationEmail')} >Resend Confirmation</button>
          <button className="forgotPassword" onClick={()=>openConfirmationForm('forgotPassword')} >Forgot Password </button>
        </div>
      </section>
      {showConfirmationForm && (
        <div className="confirmation-form-container">
          <form className="confirmation-form" onSubmit={handleConfirmationSubmit}>
           {path==='resendConfirmationEmail'?<h2> Resend Confirmation Email</h2>
           :<h2>Reset Password </h2>
           }
            
            <input
              type="email"
              placeholder="Enter Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required={true}
            />
            <div className="confirmation-form-buttons">
              <button className="sub" type="submit">Submit</button>
              <button className="cancel" type="button" onClick={closeConfirmationForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default Login;


