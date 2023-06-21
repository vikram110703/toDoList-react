import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
            // Simulate a delay of 1 second before hiding the loader
            const timer = setTimeout(() => {
              setLoading(false);
            }, 1000);
        
            return () => clearTimeout(timer);
          }, []);
        setLoading(false);

        toast.success(response.data.message);
        navigate("/login"); // Redirect to the login page after successful verification
      } catch (error) {
        setVerificationMessage(error.response.data.message);
        setIsAuthenticated(false);
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    verifyEmail();
  }, [id, setIsAuthenticated, setLoading, navigate]);

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
