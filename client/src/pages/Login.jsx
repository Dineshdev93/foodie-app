import React, { useState } from "react";
import "../CSS/loginSignup.css";
import { NavLink } from "react-router-dom";
import { loginService } from "../service/userService/userApiservice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/Usercontext";
import axios from "axios";
import {toast} from 'react-toastify'
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpass, setConpass] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [conshowpass, setShowconpass] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const data = {
    email: email,
    password: password,
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0 || conpass.length === 0) {
      setError("This field is required");
    }
    else if(password !== conpass){
         toast.error("password and confirmpassword not matched !")
    }
    try {
      const response = await loginService(data);
      localStorage.setItem("authtoken", response.data.token);
      // Fetch the logged-in user data immediately after login
      const userResponse = await axios.get(
        "http://localhost:8000/userAuth/api/verifyUser",
        {
          headers: { authorization: response.data.token },
        }
      );
      setUser(userResponse.data); // Update context directly
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid User deatils !")
    }
  };

  return (
    <section className="container signup_login_form_caontainer mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6  register_user">
          <h2 className="text-center">Welcome Back!</h2>
          <span className="subhedaing">
            Already have an account , Plz &nbsp;{" "}
            <NavLink to={"/signup"}>Signup Now</NavLink>
          </span>
          <form>
            <div className="mt-2 mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <br />
              <span style={{ color: "red" }}>
                {email.length === 0 && error ? error : ""}
              </span>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 password_container">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <br />
              <span style={{ color: "red" }}>
                {password.length === 0 && error ? error : ""}
              </span>
              <input
                type={showpass ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="eye_icon">
                <span
                  onClick={() => setShowpass(!showpass)}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={
                      showpass ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="mb-3 password_container">
              <label for="exampleInputPassword2" className="form-label">
                Confirm Password
              </label>
              <br />
              <span style={{ color: "red" }}>
                {conpass.length === 0 && error ? error : ""}
              </span>
              <input
                type={conshowpass ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword2"
                placeholder="Enter confirm password"
                onChange={(e) => setConpass(e.target.value)}
              />
              <div className="eye_icon">
                <span
                  onClick={() => setShowconpass(!conshowpass)}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={
                      conshowpass
                        ? "fa-regular fa-eye"
                        : "fa-regular fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="mb-3 forgotpasslink">
                <NavLink  to={"/forgotpassword"}>Forfgot password</NavLink>
            </div>
            <div className="btn_register">
              <button onClick={handlelogin}>Log in</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
