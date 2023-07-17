import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

const Verify = () => {
  const { isAuthenticated,setIsAuthenticated, loading,setLoading, user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [verificationMessage, setVerificationMessage] = useState("");
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/users/verify?id=${id}`);
        setVerificationMessage(response.data.message);
        setIsAuthenticated(true);
        
        useEffect(() => {
            // Simulate a delay of 0.2 second before hiding the loader
            const timer = setTimeout(() => {
              setLoading(false);
            }, 200);
        
            return () => clearTimeout(timer);
          }, []);
        setLoading(false);

        toast.success(response.data.message);
        navigate('/') // Redirect to the home page after successful verification
      } catch (error) {
        setVerificationMessage(error.response.data.message);
        setIsAuthenticated(false);
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    verifyEmail();
  }, [id, setIsAuthenticated, setLoading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="verification">
      <h2>Email Verification</h2>
      <p>{verificationMessage}</p>
      {isAuthenticated && <p>You can now login to your account.</p>}
    </div>
  );
};

export default Verify;
