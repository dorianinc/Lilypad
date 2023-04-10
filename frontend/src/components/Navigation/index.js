import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton/ProfileButton";
import LogoButton from "./LogoButton/LogoButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navBar">
      <NavLink exact to="/">
        <LogoButton />
      </NavLink>
      {isLoaded && <ProfileButton user={sessionUser} />}
    </div>
  );
}

export default Navigation;
