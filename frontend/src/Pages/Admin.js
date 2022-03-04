import React from "react";
import DeleteUser from "../components/Admin/DeleteUser";
import Navbar from "../components/Navbar";

export default function Admin () {
  return (
    <div>
      <Navbar />
      <DeleteUser />
    </div>
  );
}
