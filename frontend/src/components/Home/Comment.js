// Import

import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Component

export default function Comment(props) {
  // Get user

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserDecoded = currentUser && jwt_decode(currentUser);

  // State

  const [newCommentContent, setNewCommentContent] = useState("");
  const [deleteComment, setDeleteComment] = useState(0);

  // querySelector

  const contentCommentInnerHtml = document.querySelector(
    ".createcommentcontent"
  );

  // Delete comment

  useEffect(() => {
    if (deleteComment !== 0) {
      if (window.confirm("Supprimer le commentaire ? ")) {
        axios({
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser}`,
          },
          url: `http://localhost:5000/api/comments/delete/${deleteComment}`,
          data: {
            userId: currentUserDecoded.userId,
          },
        })
          .then(setDeleteComment(0), props.setRefresh(!props.refresh))
          .catch((error) => console.log(error.response));
      } else {
        setDeleteComment(0);
      }
    }
  }, [deleteComment]);

  // Function handleCreateComment

  const handleCreateComment = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
      url: "http://localhost:5000/api/comments/create",
      data: {
        content: newCommentContent,
        userId: currentUserDecoded.userId,
        postId: props.postid,
      },
    })
      .then(
        props.setRefresh(!props.refresh),
        setNewCommentContent(""),
        contentCommentInnerHtml.value
          ? (contentCommentInnerHtml.value = "")
          : null,
        (contentCommentInnerHtml.innerHTML = "")
      )
      .catch((error) => console.log(error.response));
  };

  // JSX

  return (
    <div className="commentspace">
      {props.boucle.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="commentuser">
            <div className="user__info__comment">
              <div className="avatar">
                <img
                  src={comment.User.avatar}
                  alt="avatar"
                  onClick={() =>
                    window.location.assign(`/profil?id=${comment.userId}`)
                  }
                />
              </div>
              <div>
                <p>
                  {comment.User.firstName} {comment.User.lastName}
                </p>
                <p className="commentdate">{props.date(comment.createdAt)}</p>
              </div>
            </div>
            {comment.userId === currentUserDecoded.userId ||
            currentUserDecoded.admin ? (
              <div>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="icon__delete__comment"
                  onClick={() => setDeleteComment(comment.id)}
                ></FontAwesomeIcon>
              </div>
            ) : null}
          </div>
          <p>{comment.content}</p>
        </div>
      ))}

      {/* Créé un commentaire*/}

      <div className="create__comment__space">
        <div className="createcomment">
          {" "}
          <div className="avatartextarea">
            <div className="avatar">
              <img src={props.avatar} alt="" />
            </div>
            <textarea
              className="createcommentcontent"
              placeholder="Écrire un commentaire"
              onChange={(e) => setNewCommentContent(e.target.value)}
            ></textarea>
          </div>{" "}
        </div>
        <div className="containericon">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="iconcomment"
            onClick={handleCreateComment}
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}
