// Import

import React, { useState } from "react";
import axios from "axios";
import { validEmail, validPassword, validName } from "../../utils/regexp";

export default function SignUpForm() {
  // State of the button

  const [formSubmit, setFormSubmit] = useState(false);

  // State

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  // Test Regexp

  const testEmail = validEmail.test(email);
  const testFirstName = validName.test(firstName);
  const testLastName = validName.test(lastName);
  const testPassword = validPassword.test(password);

  // Get element for show error

  const emailError = document.querySelector(".email.error");
  const firstNameError = document.querySelector(".firstname.error");
  const lastNameError = document.querySelector(".lastname.error");
  const passwordError = document.querySelector(".password.error");
  const passwordConfirmError = document.querySelector(
    ".password-confirm.error"
  );
  const passwordInfo = document.querySelector(".textpassword");
  const terms = document.getElementById("terms");
  const termsError = document.querySelector(".terms.error");

  // Function handleRegister

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      password === controlPassword &&
      terms.checked &&
      testEmail &&
      testFirstName &&
      testLastName &&
      testPassword
    ) {
      axios
        .post("http://localhost:5000/api/users/signup", {
          email,
          password,
          firstName,
          lastName,
        })
        .then(() => {
          setFormSubmit(true);
        })
        .catch((error) => {
          console.log("51 Signup");
          if (error.response) {
            emailError.innerHTML = error.response.data.message;
            firstNameError.innerHTML = "";
            lastNameError.innerHTML = "";
            passwordError.innerHTML = "";
            passwordConfirmError.innerHTML = "";
            termsError.innerHTML = "";
          }
        });
    } else {
      // Show error to user
      if (!testEmail) {
        emailError.innerHTML = "Veuillez rentrer un email correct";
      } else {
        emailError.innerHTML = "";
      }
      if (!testFirstName) {
        firstNameError.innerHTML = "Veuillez rentrer un prénom correct";
      } else {
        firstNameError.innerHTML = "";
      }
      if (!testLastName) {
        lastNameError.innerHTML = "Veuillez rentrer un nom correct";
      } else {
        lastNameError.innerHTML = "";
      }
      if (!testPassword) {
        passwordError.innerHTML =
          "Doit contenir au moins 8 caractères dont une majuscules et un caractères spécial";
      } else {
        passwordError.innerHTML = "";
      }
      if (password !== controlPassword) {
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
      } else {
        passwordConfirmError.innerHTML = "";
      }
      if (!terms.checked) {
        termsError.innerHTML = "Valider les conditions générales";
      } else {
        termsError.innerHTML = "";
      }
    }
  };

  // JSX

  return (
    <>
      {/* If the user registered we tell him welcome*/}
      {formSubmit ? (
        <>
          <span></span>
          <p className="welcome sucess">
            Bienvenue {firstName} {lastName} voulez-vous vous connectez ?
          </p>
        </>
      ) : (
        <div className="form signup">
          {/* If the user want to register*/}
          <form action="" onSubmit={handleRegister}>
            <img src="./img/logowhite.png" alt="" />
            <label htmlFor="">Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <div className="email error"></div>
            <label htmlFor="">Prénom</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)} />
            <div className="firstname error"></div>
            <label htmlFor="">Nom</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)} />
            <div className="lastname error"></div>
            <label htmlFor="">Mot de passe</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password error"></div>
            <label htmlFor="">Confirmer votre mot de passe</label>{" "}
            <input
              type="password"
              name="password-confirm"
              onChange={(e) => setControlPassword(e.target.value)}
            />{" "}
            <div className="password-confirm error"></div>
            <div className="terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                J'accepte les{" "}
                <a href="/" target="_blank" rel="noopener noreferrer">
                  conditions générales
                </a>
              </label>
            </div>
            <div className="terms error"></div>
            <input type="submit" value="Valider l'inscription" />
          </form>
        </div>
      )}
    </>
  );
}
