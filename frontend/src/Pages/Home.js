import React from "react";
import Post from "../components/Home/Post";
import SearchBar from "../components/Home/SearchBar";
import Navbar from "../components/Navbar";
function Home() {
  return (
    <div>
    <Navbar />
    <SearchBar/>
      <Post />{" "}
    </div>
  );
}

export default Home;
