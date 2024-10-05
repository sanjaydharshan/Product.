import React, { useState, useEffect } from "react";
import "./style.scss";
import * as bootstrap from "bootstrap";
import NavComponent from "../GlobalComponents/Nav_component/Nav";
import googleicon from "../../assets/login/Google_Icons-09-512.webp";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [UserDetails, setUserDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [signup, setsignup] = useState(false);

  return (
    <div className="login_main">
      <NavComponent type={"login"} setsignup={setsignup} signup={signup} />
      <div className="set-Background"></div>

      <div className="login_form">
        <form className="field_wrapper" onSubmit={(e) => e.preventDefault()}>
          <h1 class="login-page-new__main-form-title ng-star-inserted">
            {" "}
            Welcome back!
          </h1>
          <div className="google_login">
            <img src={googleicon}></img>
            <p>Continue With Google</p>
          </div>
          <div class="social-login-divider">
            <span>or</span>
          </div>
          {!signup ? (
            <>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={UserDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...UserDetails, email: e.target.value })
                  }
                />
                <div className="icons">
                  <i class="bi bi-envelope"></i>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={UserDetails.password}
                  onChange={(e) =>
                    setUserDetails({ ...UserDetails, password: e.target.value })
                  }
                />
                <div className="icons">
                  <i class="bi bi-shield-lock"></i>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="FullName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="FullName"
                  value={UserDetails.Full_Name}
                  onChange={(e) =>
                    setUserDetails({
                      ...UserDetails,
                      Full_Name: e.target.value,
                    })
                  }
                />
                <div className="icons">
                  <i class="bi bi-envelope"></i>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={UserDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...UserDetails, email: e.target.value })
                  }
                />
                <div className="icons">
                  <i class="bi bi-envelope"></i>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={UserDetails.password}
                  onChange={(e) =>
                    setUserDetails({ ...UserDetails, password: e.target.value })
                  }
                />
                <div className="icons">
                  <i class="bi bi-shield-lock"></i>
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            className="submit_button"
            onClick={(e) => {
              e.preventDefault();
              console.log("User Login Successful");
              navigate("/product");
            }}
          >
            {!signup ? "Login" : "Signup"}
          </button>
        </form>
        <div class="form-footer">
          {!signup ? (
            <div class="form-footer-text ng-star-inserted">
              {" "}
              Don't have an account?{" "}
              <a
                data-test="login__main-bot-text-link"
                class="login-page-new__main-bot-text-link"
                onClick={(e) => {
                  setsignup(true);
                }}
              >
                Sign up
              </a>
            </div>
          ) : (
            <div class="form-footer-text ng-star-inserted">
              {" "}
              Back To Login{" "}
              <a
                data-test="login__main-bot-text-link"
                class="login-page-new__main-bot-text-link"
                onClick={(e) => {
                  setsignup(false);
                }}
              >
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
