import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import jwt_decode from "jwt-decode";

export default function SearchBar() {
  // Get user info
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserDecoded = currentUser && jwt_decode(currentUser);

  if (!currentUser) {
    window.location.assign("/login");
  }

  // State

  const [searchUser, setSearchUser] = useState("");
  const [dataUsers, setDataUsers] = useState([]);

  // Get User

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/api/users/getall", {
        headers: { Authorization: `Bearer ${currentUser}` },
      }).catch((error) => console.log(error.response.data));
      setDataUsers(result.data);
    };
    fetchData();
  }, []);
  console.log(dataUsers);

  return (
    <div className="searchbar__container">
      <input
        type="search"
        onChange={(e) => setSearchUser(e.target.value)}
        placeholder="Rechercher un utilisateur"
        className="searchbar"
      ></input>
      {searchUser !== "" ? (
        <div className="searchbar__userlist">
          {dataUsers
            .filter((user) => {
              return user.firstName.includes(searchUser);
            })
            .map((user) => (
              <Fragment key={user.id}>
                {searchUser}
                <div className="searchbar__user">
                  <ul
                    className="searchbar__user__info"
                    onClick={() =>
                      window.location.assign(`/profil?id=${user.id}`)
                    }
                  >
                    <li>
                      <img
                        className="searchbar__user__avatar"
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                    </li>
                    <li className="searchbar__user__name">
                      {user.firstName} {user.lastName}
                    </li>
                  </ul>
                </div>
              </Fragment>
            ))}
        </div>
      ) : null}
    </div>
  );
}
