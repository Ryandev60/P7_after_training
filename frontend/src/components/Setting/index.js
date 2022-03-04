// Import

import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { validPassword, validName } from "../../utils/regexp";

// Component

export default function Param() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    window.location.assign("/login");
  }
  const currentUserDecoded = currentUser && jwt_decode(currentUser);
  console.log(currentUserDecoded.userId);

  // State

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [modifyFirstName, setModifyFirstName] = useState("");
  const [modifLastName, setModifyLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [deleteUserPassword, setDeleteUserPassword] = useState("");
  const [modifyPassword, setModifyPassword] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState(null);

  // Get div error

  const firstNameError = document.querySelector(".message__firstname");
  const lastNameError = document.querySelector(".message__lastname");
  const passworError = document.querySelector(".message__password");
  const newPasswordError = document.querySelector(".message__newpassword");
  const deleteUserError = document.querySelector(".message__deleteuser");
  const nameImage = document.querySelector(".nameimage");
  const newPasswordSucess = document.querySelector(
    ".message__newpassword__success"
  );

  // Get input

  const inputFirstName = document.querySelector(".input__firstname");
  const inputLastName = document.querySelector(".input__lastname");
  const inputCurrentPassword = document.querySelector(
    ".input__currentpassword"
  );
  const inputNewPassword = document.querySelector(".input__newpassword");

  // Test Regexp
  const testFirstName = validName.test(modifyFirstName);
  const testLastName = validName.test(modifLastName);
  const testPassword = validPassword.test(modifyPassword);

  // Fetch data

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:5000/api/users/getone/${currentUserDecoded.userId}`,
        {
          headers: { Authorization: `Bearer ${currentUser}` },
          data: { id: currentUserDecoded.id },
        }
      );
      setAvatar(result.data.user.avatar);
      setFirstname(result.data.user.firstName);
      setLastName(result.data.user.lastName);
      setEmail(result.data.user.email);
    };
    fetchData();
    setRefresh(false);
  }, [refresh]);

  // Function onFileChange

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
    nameImage.innerHTML = " Avatar : " + e.target.files[0].name;
  };

  // Function handleUserAvatar

  const handleUserAvatar = () => {
    let formData = new FormData();
    formData.append("image", image);
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: `http://localhost:5000/api/users/modify/avatar/${currentUserDecoded.userId}`,
      data: formData,
    })
      .then(setRefresh(true), (nameImage.innerHTML = ""))
      .catch((error) => console.log(error.response));
  };

  // Function handleUserFirstName

  const handleUserFirstName = () => {
    if (testFirstName) {
      axios({
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser}`,
        },
        url: `http://localhost:5000/api/users/modify/firstname/${currentUserDecoded.userId}`,
        data: {
          firstName: modifyFirstName,
        },
      })
        .then(setRefresh(true), (inputFirstName.value = ""))
        .catch((error) => console.log(error.response));
    } else {
      firstNameError.innerHTML = "Veuillez rentrer un prénom correct";
    }
  };

  // Function handleUserLastName

  const handleUserLastName = () => {
    if (testLastName) {
      axios({
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser}`,
        },
        url: `http://localhost:5000/api/users/modify/lastname/${currentUserDecoded.userId}`,
        data: {
          lastName: modifLastName,
        },
      })
        .then(setRefresh(true), (inputLastName.value = ""))
        .catch((error) => console.log(error.response));
    } else {
      lastNameError.innerHTML = "Veuillez rentrer un nom correct";
    }
  };

  // Function handleUserPassword

  const handleUserPassword = () => {
    if (testPassword) {
      axios({
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser}`,
        },
        url: `http://localhost:5000/api/users/modify/password`,
        data: {
          userId: currentUserDecoded.userId,
          currentPassword: currentPassword,
          newPassword: modifyPassword,
        },
      })
        .then((response) => {
          newPasswordSucess.innerHTML = response.data.message;
          inputCurrentPassword.value = "";
          inputNewPassword.value = "";
          newPasswordError.innerHTML = "";
          passworError.innerHTML = "";
        })
        .catch((error) => {
          passworError.innerHTML = error.response.data.error;
          newPasswordSucess.innerHTML = "";
          newPasswordError.innerHTML = "";
        });
    } else {
      newPasswordError.innerHTML =
        "Doit contenir au moins 8 caractères dont une majuscules et un caractères spécial";
      newPasswordSucess.innerHTML = "";
      passworError.innerHTML = "";
    }
  };

  // Function handleUserDelete

  const handleUserDelete = () => {
    if (window.confirm("Supprimer votre compte ? ")) {
      axios({
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser}`,
        },
        url: `http://localhost:5000/api/users/delete`,
        data: {
          deleteUserPassword,
          userId: currentUserDecoded.userId,
        },
      })
        .then((deleteUserError.innerHTML = "Utilisateur supprimé avec succés"),
        localStorage.clear(),
        window.location.assign('/login'))
        .catch(
          (error) => (deleteUserError.innerHTML = error.response.data.error)
        );
    }
  };

  // JSX

  return (
    <div className="containerparam">
      <div className="paramspace">
        <div className="modify">
          {/* Avatar */}

          <div className="modify__align">
            <img src={avatar} alt="" className="avatar" />
            <label htmlFor="file" className="modify__avatar__text">
              Modifier votre avatar
            </label>
            <input
              type="file"
              id="file"
              name="image"
              onChange={onFileChange}
              className="white"
              accept=".png, .jpg, .jpeg, .gif"
            />
            <button className="modifybutton" onClick={handleUserAvatar}>
              Valider
            </button>
          </div>
          <div className="nameimage"></div>
        </div>

        {/* Firstname */}

        <p>{firstName}</p>
        <div className="modify__align">
          <input
            type="text"
            placeholder="Modifier votre prénom"
            className="input__firstname"
            onChange={(e) => setModifyFirstName(e.target.value)}
          />
          <button className="modifybutton" onClick={handleUserFirstName}>
            Valider
          </button>
        </div>
        <div className="message__firstname modify__error"></div>

        {/* Lastname */}
        <p>{lastName}</p>

        <div className="modify__align">
          <input
            type="text"
            placeholder="Modifier votre nom"
            className="input__lastname"
            onChange={(e) => setModifyLastName(e.target.value)}
          />
          <button className="modifybutton" onClick={handleUserLastName}>
            Valider
          </button>
        </div>
        <div className="message__lastname modify__error"></div>

        {/* Email */}

        <div className="modify email">
          <p>{email}</p>
        </div>

        {/* Password */}

        <div className="modify password">
          <p>Modifier votre mot de passe</p>
          <input
            defaultValue=""
            type="password"
            placeholder="Mot de passe actuel"
            className="input__currentpassword"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <div className="message__password modify__error"></div>
          <div className="modify__align">
            <input
              className="input__newpassword"
              placeholder="Nouveau mot de passe"
              defaultValue=""
              type="password"
              onChange={(e) => setModifyPassword(e.target.value)}
            />
            <button className="modifybutton" onClick={handleUserPassword}>
              Valider
            </button>
          </div>
          <div className="message__newpassword modify__error"></div>
          <div className="message__newpassword__success"></div>
        </div>

        {/* Delete  */}

        <label htmlFor="deleteuser"> Supprimer votre compte</label>
        <div className="modify__align">
          <input
            type="password"
            placeholder="Rentrer votre mot de passe"
            className="input__deleteuser"
            onChange={(e) => setDeleteUserPassword(e.target.value)}
          />
          <button className="modifybutton" onClick={handleUserDelete}>
            Valider
          </button>
        </div>
        <div className="message__deleteuser modify__error"></div>
      </div>
    </div>
  );
}
