import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../LoginFormModal";
import SignupFormModal from "../../SignupFormModal";
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
    <div class="userMenu">
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
            <>
              {/* <div>{user.username}</div> */}
              <div>Hello, {user.firstName}</div>
              <div>{user.email}</div>
              <div>
                <button className="modalButtons auth" onClick={manageSpots}>
                  Manage Spots
                </button>
              </div>
              <div>
                <button className="modalButtons auth" onClick={logout}>
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <OpenModalButton
                  className="modalButtons auth"
                  buttonText="Sign Up"
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
              <div>
                <OpenModalButton
                  className="modalButtons auth"
                  buttonText="Log In"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
