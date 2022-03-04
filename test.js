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
   className="icon error"
   onClick={() => setPostLiked(item.id)}
 ></FontAwesomeIcon>
)}