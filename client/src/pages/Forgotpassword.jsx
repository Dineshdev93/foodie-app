import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Spiner from "../Spiner/Spiner";
import { forgotpasswordService } from "../service/userService/userApiservice";
const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const body = {
    email: email,
  };
  const handleSubmit = async () => {
    if (email.length === 0) {
      toast.error("Please Enter Your Email");
    }
    else{
      try {
          setLoading(true);
          await forgotpasswordService(body);
          setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  return (
    <>
      {loading ? (
        <Spiner />
      ) : (
        <section className="mt-5 mb-5 forgotpassword">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="card p-5 shadow-sm">
                  <h2 className="text-center mb-3 forgotpassword-heading">
                    Forgot Password
                  </h2>
                  <p className="text-center text-secondary">
                    Enter your registered email address to receive a password
                    reset link.
                  </p>
                  <input
                    type="email"
                    name="forgotpassword"
                    id="forgotpass"
                    placeholder="Enter your email"
                    className="mt-4"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="mt-4">
                    <button className="forgotsubmit" onClick={handleSubmit}>
                      Generate Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Forgotpassword;
