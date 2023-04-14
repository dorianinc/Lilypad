import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../../store/sessionReducer";
import OpenModalButton from "../../Modals/OpenModalButton/OpenModal";
import LoginFormModal from "../../Modals/LoginFormModal/LoginForm";
import SignupFormModal from "../../Modals/SignupFormModal/SignupForm";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const manageSpots = (e) => {
    e.preventDefault();
    history.push("/spots/current");
  };

  const dropdown = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="userMenu">
      {user ? (
        <Link to="/spots/new">
          <p>Create a New Spot</p>
        </Link>
      ) : null}
      <div className="userButton">
        <button onClick={openMenu}>
          <div className="menuIcon">
            <i className="fa-solid fa-bars" />
          </div>
          <div className="userIcon">
            <i className="fas fa-user-circle" />
          </div>
        </button>
        <div className={dropdown} ref={ulRef}>
          {user ? (
            <div className="userInfo">
              <div><p id="firstName">Hello, {user.firstName}</p></div>
              <div><p id="email">{user.email}</p></div>
              <div>
                <hr />
                <button className="modalButtons auth" onClick={manageSpots}>
                  Manage Spots
                </button>
              </div>
              <div>
                <button className="modalButtons auth" onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <OpenModalButton
                  className="modalButtons auth"
                  buttonText="Log In"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div>
                <OpenModalButton
                  className="modalButtons auth"
                  buttonText="Sign Up"
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
