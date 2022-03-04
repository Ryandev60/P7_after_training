import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Comment from "../Home/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Main() {
  // Get user info
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserDecoded = currentUser && jwt_decode(currentUser);

  if (!currentUser) {
    window.location.assign("/login");
  }

  // State

  const [firstName, setFirstName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [dataPost, setDataPost] = useState("");
  const [postLiked, setPostLiked] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Get user clicked info

  const str = document.location.href;
  const url = new URL(str);
  const searchParams = new URLSearchParams(url.search);

  if (searchParams.has("id")) {
    var id = searchParams.get("id");
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:5000/api/users/getone/${id}`,
        {
          headers: { Authorization: `Bearer ${currentUser}` },
        }
      );
      setAvatar(result.data.user.avatar);
      setFirstName(result.data.user.firstName);
      setLastName(result.data.user.lastName);
      setEmail(result.data.user.email);
    };
    fetchData();
  }, []);

  // Get post by user

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:5000/api/posts/getbyuser/${id}`,
        {
          headers: { Authorization: `Bearer ${currentUser}` },
        }
      ).catch((error) => console.log(error.response.data));
      setDataPost(result.data);
    };
    fetchData();
    setRefresh(false);
  }, [refresh]);

  // Like/Unlike

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
        setPostLiked(null);
        setRefresh(true);
      })
      .catch((error) => console.log(error.response));
  }, [postLiked]);

  // Convert date

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

  return (
    <div className="profil__container">
      <div className="profil__block">
        <div className="profil__user">
          <ul className="profil__user__info">
            <li>
              <img
                className="profil__user__avatar"
                src={avatar}
                alt={`${firstName} ${lastName}`}
              />
            </li>
            <li className="profil__user__name">
              {firstName} {lastName}
            </li>
            <li className="profil__user__email">{email}</li>
          </ul>
        </div>
      </div>
      <ul className="profil__post__container">
        {dataPost &&
          dataPost.map((post) => (
            <li key={post.id} className="profil__post">
              <div className="profil__post__info">
                <div className="profil__post__info__user">
                  <div>
                    <img
                      src={post.User.avatar}
                      alt={`${post.User.firstName} ${post.User.lastName}`}
                    />
                  </div>
                  <div className="profil__post__info__user__info">
                    <div>
                      {post.User.firstName} {post.User.lastName}
                    </div>
                    <div>{formatDate(post.createdAt)}</div>
                  </div>
                </div>
              </div>
              <div className="profil__post__content">
                <div className="profil__post__content__postcontent">
                  {post.postContent}
                </div>
                <div className="profil__post__content__attachment">
                  <img src={post.attachment} alt="" />
                </div>
                <ul className="profil__post__likecomment">
                  <li>
                    {post.Likes.find(
                      (i) => i.userId === currentUserDecoded.userId
                    ) ? (
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="profil__post__like"
                        onClick={() => setPostLiked(post.id)}
                      ></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="profil__post__like--grey"
                        onClick={() => setPostLiked(post.id)}
                      ></FontAwesomeIcon>
                    )}{" "}
                    {post.Likes.length}
                  </li>
                  <li className="commentnumber">
                    {post.Comments.length}{" "}
                    {post.Comments.length > 1 ? "Commentaires" : "Commentaire"}
                  </li>
                </ul>
              </div>
              <Comment
                boucle={post.Comments}
                date={formatDate}
                postid={post.id}
                avatar={post.User.avatar}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
