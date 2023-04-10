import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../assets/images/logo.png"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navBar">
      <ul>
        <li>
          <NavLink exact to="/">
          <img style={{height: 35, width: 40}} src={logo}/>
          </NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
