import LogoMain from "../../../assets/login/61f12e3a57bdb3717fbf9cec_Product_Default.svg";
import { Button } from "../ButtonComponent/button";
import "./style.scss";
import { useNavigate } from "react-router-dom";

export default function NavComponent(props) {
  const navigate = useNavigate();

  return (
    <div
      className="nav_wrapper"
      style={{
        boxShadow:
          props?.type != "login" ? "0 2px 4px 0 rgba(0,0,0,.2)" : "none",
      }}
    >
      <img src={LogoMain} className="main_logo"></img>
      {props?.type == "login" ? (
        <div className="signup_wrapper">
          {!props.signup?<span>Don't have an account?</span>:<span>Back To Login</span>}
          <Button buttontext={!props.signup?"Sign Up":"Log In"} active handleClick={(e)=>{if(!props.signup){props.setsignup(true)}else{props.setsignup(false)}}} />
        </div>
      ) : (
        <Button
          buttontext={"Logout"}
          active
          handleClick={(e) => {
            navigate("/");
          }}
        />
      )}
    </div>
  );
}
