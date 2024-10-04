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
          <span>Don't have an account?</span>
          <Button buttontext={"Sign Up"} active />
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
