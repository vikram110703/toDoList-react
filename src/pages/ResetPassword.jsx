import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

import '../styles/resetPassword.scss';

const ResetPassword = () => {

    const { loading, setLoading } = useContext(Context);
    const { token } = useParams();
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(token); 
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
            setTimeout(() => {
                setPassword("");
                toast.success(data.message);
                setLoading(false);
            }, 300); // Delay of 0.3 second 

        } catch (error) {
            setTimeout(() => {
                setPassword("");
                toast.error(error.response.data.message);
                setLoading(false);
            }, 300);

        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="resetPassContainer" >
            <form onSubmit={submitHandler}>
                <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button disabled={loading} type="submit">
                    Submit
                </button>
            </form>
        </section>
    );
};

export default ResetPassword;
