// Import

import React, { useState } from "react";
import axios from "axios";

// Component

export default function SignInForm() {

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function handleLogin

  const handleLogin = (e) => {
    e.preventDefault();

    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios
      .post("http://localhost:5000/api/users/login", {
        headers: {
          "Content-Type": "application/json",
        },
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.token));
        window.location.assign("/");
        // localStorage.setItem('user', JSON.stringify(res.data.token));
      })
      .catch((error) => {
        error.response.data.email
          ? (emailError.innerHTML = error.response.data.email)
          : (emailError.innerHTML = "");

        error.response.data.password
          ? (passwordError.innerHTML = error.response.data.password)
          : (passwordError.innerHTML = "");
      });
  };

  // JSX

  return (
    <div className="form">
      <form action="" onSubmit={handleLogin}>
        <img src="./img/logowhite.png" alt="" />
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="email error"></div>
        <label htmlFor="">Mot de passe</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="password error"></div>
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
}
