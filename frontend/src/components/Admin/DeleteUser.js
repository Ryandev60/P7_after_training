// Import

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// Component

export default function DeleteUser() {
  // State

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserFirstName, setDeleteUserFirstName] = useState(null);
  const [deleteUserLastName, setDeleteUserLastName] = useState(null);

  // Get user info
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserDecoded = currentUser && jwt_decode(currentUser);
  const currentUserAdmin = currentUserDecoded.admin;

  // If current user is not admin redirect to home

  if (currentUserAdmin === false) {
    window.location.assign("/");
  }

  // fetchData User

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/api/users/getall", {
        headers: { Authorization: `Bearer ${currentUser}` },
      }).catch((error) => console.log(error.response.data));
      setData(result.data);
    };
    fetchData();
    setRefresh(false);
  }, [refresh]);

  // Delete User

  useEffect(() => {
    if (deleteUserId !== null) {
      if (
        window.confirm(
          `Êtes vous sur de vouloir supprimer ${deleteUserFirstName} ${deleteUserLastName} ?`
        )
      ) {
        axios({
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser}`,
          },
          url: `http://localhost:5000/api/users/delete/admin`,
          data: {
            userId: deleteUserId,
          },
        });
        setRefresh(true);
      } else {
        setDeleteUserId(null);
        setDeleteUserFirstName(null);
        setDeleteUserLastName(null);
      }
    }
  }, [deleteUserId]);

  return (
    <div className="container__admin">
      <div className="admin__space">
        <h1>Gérer les utilisateurs</h1>
        <div className="table__users">
          {data.map((user) => (
            <Fragment key={user.id}>
              <div className="user__info">
                <img src={user.avatar} alt="" />
                <ul>
                  <li>
                    {user.firstName} {user.lastName}
                  </li>
                  <li>{user.email}</li>
                </ul>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="icon"
                  onClick={() => {
                    setDeleteUserId(user.id);
                    setDeleteUserFirstName(user.firstName);
                    setDeleteUserLastName(user.lastName);
                  }}
                ></FontAwesomeIcon>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
