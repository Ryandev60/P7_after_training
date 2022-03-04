import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUserCog,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";

const currentUser = JSON.parse(localStorage.getItem("user"));
const currentUserDecoded = currentUser && jwt_decode(currentUser);
let currentUserAdmin = false;

if (currentUser) {
  currentUserAdmin = currentUserDecoded.admin;
}

function Navbar() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.assign("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="left__icon">
          <FontAwesomeIcon
            icon={faUserCog}
            className="icon__navbar user"
            onClick={() => window.location.assign("/setting")}
          ></FontAwesomeIcon>

          {currentUserAdmin ? (
            <FontAwesomeIcon
              icon={faUsersCog}
              className="icon__navbar"
              onClick={() => window.location.assign("/admin")}
            ></FontAwesomeIcon>
          ) : null}
        </div>

        <img
          src="./img/logowhite.png"
          alt="Logo Groupomania"
          onClick={() => window.location.assign("/")}
        />

        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="icon__navbar"
          onClick={logout}
        ></FontAwesomeIcon>
      </div>
    </>
  );
}

export default Navbar;
