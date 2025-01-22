import React from "react";
import { useState, useEffect } from "react";
import "../CSS/resetpass.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [conpassword, setconPassword] = useState("");
  const [conpass, setConpass] = useState(false);
  const [validUser, setValidUser] = useState(null);
  const { id, token } = useParams(); // Get the id and token from the URL
  useEffect(() => {
    // Verify the token when the component loads
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `http://192.168.168.13:8000/userAuth/api/forgotpassdetails/${id}/${token}`
        );
        if (response.status === 200) {
          setValidUser(true); // If the user is valid, set the state to true
        }
        console.log(id, token);
      } catch (error) {
        setValidUser(false); // If there's an error (invalid token), set the state to false
      }
    };

    verifyToken();
  }, [id, token]);

  const data = {
    password: password,
  };

  //  handle reset password
  const resetpassword = async () => {
    if (password.length === 0 || conpassword.length === 0) {
      toast.error("Please provide password");
    } else if (password !== conpassword) {
      toast.error("Password and confirm password value is not equall !");
    } else {
      try {
        const resetpassword = await axios.put(
          `http://192.168.168.13:8000/userAuth/api/resetPassword/${id}/${token}`,
          data
        );
        if (resetpassword) {
          toast.success("Password Update successfully");
          navigate("/login");
        }
        return resetpassword.data;
      } catch (error) {
        // console.log(error.response.data.msg);
        // toast.error(error.response.data.msg);
        // Check for backend error response
        if (error.response === 500) {
          toast.error(error.response.data.error); // Display "link expired" or other errors
        } else {
          toast.error("Link expired !");
        }
        console.error(error); // Log for debugging
      }
    }
  };

  return (
    <section className="mt-5 mb-5 forgotpassword">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card p-5 shadow-sm">
              <h2 className="text-center mb-3 forgotpassword-heading">
                Reset Your Password
              </h2>
              <p className="text-center text-secondary">
                Create a strong and secure password to regain access to your
                account.
              </p>
              <div className="position-relative mt-4">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Create a new password"
                  className="password-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <i className="fa fa-eye"></i>
                  ) : (
                    <i className="fa fa-eye-slash"></i>
                  )}
                </span>
              </div>
              <div className="position-relative mt-4">
                <input
                  type={conpass ? "text" : "password"}
                  name="password"
                  placeholder="Create a new password"
                  className="password-input"
                  onChange={(e) => setconPassword(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setConpass(!conpass)}
                >
                  {conpass ? (
                    <i className="fa fa-eye"></i>
                  ) : (
                    <i className="fa fa-eye-slash"></i>
                  )}
                </span>
              </div>
              <div className="mt-4">
                <button className="forgotsubmit" onClick={resetpassword}>
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
