import React, { useState } from "react";
import "./buttonstyle.scss";

const Button = (props) => {
  const {
    buttontext,
    handleClick,
    active,
    disabled = false,
    styles = {},
    enterStyle = {},
    leaveStyle = {},
    img = "",
    secondarytext,
  } = props;

  const [isHovered, setHovered] = useState(false);
  const calculatedStyle = {
    ...styles,
    ...(isHovered ? enterStyle : leaveStyle),
  };

  return (
    <button
      className={`customButton ${active ? "activeCustomButton" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      disabled={disabled}
      style={calculatedStyle}
    >
      {buttontext}
      {secondarytext && (
        <span
          style={{ fontSize: "35px", lineHeight: "30px", fontWeight: "200" }}
        >
          {secondarytext}
        </span>
      )}
    </button>
  );
};

export { Button };
