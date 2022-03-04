// Import

import React, { Fragment, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faImage,
  faThumbsUp,
  faComment,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Comment from "./Comment";

// Component

export default function Post() {
  // Get user info
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserDecoded = currentUser && jwt_decode(currentUser);

  if (!currentUser) {
    window.location.assign("/login");
  }

  // State

  const [refresh, setRefresh] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [deletePost, setDeletePost] = useState(0);
  const [newPostContent, setNewPostContent] = useState("");
  const [data, setData] = useState([]);
  const [postLiked, setPostLiked] = useState(null);
  const [image, setImage] = useState(null);
  const [classIconLike, setClassIconLike] = useState(null);

  // querySelector

  const contentPostInnerHtml = document.querySelector(".createpostcontent");
  const nameImage = document.querySelector(".image__name");

  // placeholder comment

  const placeholder = "Quoi de neuf aujourd'hui " + firstName;

  // Function formatDate

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // fetchData Post

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/api/posts/", {
        headers: { Authorization: `Bearer ${currentUser}` },
      }).catch((error) => console.log(error.response.data));
      setData(result.data);
    };
    fetchData();
    setRefresh(false);
  }, [refresh]);

  // fetchData User

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
    };
    fetchData();
  }, []);

  // Function handleCreatePost

  const handleCreatePost = () => {
    let formData = new FormData();
    formData.append("userId", currentUserDecoded.userId);
    formData.append("postContent", newPostContent);
    formData.append("image", image);
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: "http://localhost:5000/api/posts/create",
      data: formData,
    })
      .then(
        setRefresh(!refresh),
        contentPostInnerHtml.value ? (contentPostInnerHtml.value = "") : null,
        setNewPostContent(""),
        (nameImage.innerHTML = "")
      )
      .catch((error) => console.log(error.response));
  };

  // Upload file

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
    nameImage.innerHTML = e.target.files[0].name;
  };

  // Delete post

  useEffect(() => {
    if (deletePost !== 0) {
      if (window.confirm("Supprimer le post ? ")) {
        axios({
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser}`,
          },
          url: `http://localhost:5000/api/posts/delete/${deletePost}`,
          data: {
            userId: currentUserDecoded.userId,
          },
        })
          .then(setDeletePost(0), setRefresh(!refresh))
          .catch((error) => console.log(error.response.data));
      } else {
        setDeletePost(0);
      }
    }
  }, [deletePost]);

  // Put like

  useEffect(() => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: "http://localhost:5000/api/like/update",
      data: {
        userId: currentUserDecoded.userId,
        postId: postLiked,
      },
    })
      .then((response) => {
        console.log(response.data);
        setRefresh(!refresh);
        setPostLiked(null);
      })
      .catch((error) => console.log(error.response));
  }, [postLiked]);

  // JSX

  return (
    <div className="containerpost">
      <div className="postspace">
        {/* Create Post*/}

        <div className="createpost">
          <div className="avatartextarea">
            <div className="avatar">
              <img
                src={avatar}
                alt="avatar"
                onClick={() => window.location.assign("/setting")}
              />
            </div>
            <textarea
              className="createpostcontent"
              name=""
              id=""
              placeholder={placeholder}
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
          </div>
          <div className="containericon">
            <div className="image__name"></div>

            <label htmlFor="file" className="labelfile">
              <FontAwesomeIcon icon={faImage} className="icon">
                {" "}
              </FontAwesomeIcon>
            </label>
            <input
              type="file"
              id="file"
              name="image"
              onChange={onFileChange}
              className="white"
              accept=".png, .jpg, .jpeg, .gif"
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="icon"
              onClick={handleCreatePost}
            ></FontAwesomeIcon>
          </div>
        </div>

        {/* Map Post in DB*/}

        <div className="news">
          {data.map((item) => (
            <Fragment key={item.id}>
              <div key={item.id} className="post">
                {/* Post info*/}

                <div className="postinfo">
                  <div className="avatar">
                    <img
                      src={item.User.avatar}
                      alt="avatar"
                      className=""
                      onClick={() =>
                        window.location.assign(`/profil?id=${item.User.id}`)
                      }
                    />
                  </div>

                  {/* User who have create post info */}
                  <div className="userandtime">
                    <p>
                      {item.User.firstName} {item.User.lastName}
                    </p>
                    <p>{formatDate(item.createdAt)}</p>
                  </div>

                  {/* Delete post */}

                  {item.userId === currentUserDecoded.userId ||
                  currentUserDecoded.admin ? (
                    <div>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="icon__delete__post"
                        onClick={() => setDeletePost(item.id)}
                      ></FontAwesomeIcon>
                    </div>
                  ) : null}
                </div>

                {/* Content post*/}

                <div>
                  <p className="postcontent">{item.postContent}</p>
                </div>
                <div className="postimg">
                  <img src={item.attachment} alt="" />
                </div>

                {/* Number of like and comment */}

                <div className="numberlikecomment">
                  <ul>
                    <li className="likeandnumer">
                      {item.Likes.find(
                        (i) => i.userId === currentUserDecoded.userId
                      ) ? (
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className="icon"
                          onClick={() => setPostLiked(item.id)}
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className="icon liked"
                          onClick={() => setPostLiked(item.id)}
                        ></FontAwesomeIcon>
                      )}

                      {item.Likes.length}
                    </li>
                    <li className="commentnumber">
                      {item.Comments.length}{" "}
                      {item.Comments.length > 1
                        ? "Commentaires"
                        : "Commentaire"}
                    </li>
                  </ul>
                </div>

                {/* Comment space */}

                <Comment
                  boucle={item.Comments}
                  date={formatDate}
                  placeholder={placeholder}
                  postid={item.id}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  avatar={avatar}
                  userId={item.userId}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
