import React, { useState, useEffect } from "react";
import "./style.scss";
import * as bootstrap from "bootstrap";
import NavComponent from "../GlobalComponents/Nav_component/Nav";
import googleicon from "../../assets/login/Google_Icons-09-512.webp";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [UserDetails, setUserDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  return (
    <div className="login_main">
      <NavComponent type={"login"} />
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
          <button
            type="submit"
            className="submit_button"
            onClick={(e) => {
              e.preventDefault();
              console.log("User Login Successful");
              navigate("/product");
            }}
          >
            Login
          </button>
        </form>
        <div class="form-footer">
          <div class="form-footer-text ng-star-inserted">
            {" "}
            Don't have an account?{" "}
            <a
              data-test="login__main-bot-text-link"
              class="login-page-new__main-bot-text-link"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="set-Background"></div>
    </div>
  );
};

export default LoginPage;
