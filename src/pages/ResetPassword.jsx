import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

import '../styles/resetPassword.scss';

const ResetPassword = () => {
    const { loading, setLoading } = useContext(Context);
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showTime, setShowTime] = useState(false);
    const [remainingTime, setRemainingTime] = useState(5); // Initialize with 5 seconds .

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.put(`${server}/users/resetpassword/${token}`,
                { password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            setPassword("");
            toast.success(data.message);
            setLoading(false);
            setShowTime(true);

            // Start the countdown
            let countdown = 5;
            const countdownInterval = setInterval(() => {
                countdown--;
                setRemainingTime(countdown);
                
                if (countdown === 0) {
                    clearInterval(countdownInterval);
                    navigate('/login');
                }
            }, 1000); // Update every second

        } catch (error) {
            setPassword("");
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="resetPassContainer">
            <form onSubmit={submitHandler}>
                <input
                    type="password"
                    required
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button disabled={loading} type="submit">
                    Submit
                </button>

                {showTime && (
                    <div className="timeDiv">
                      <h1>Redirecting to login page in {remainingTime} seconds...</h1>
                    </div>
                )}

            </form>
        </section>
    );
};

export default ResetPassword;
