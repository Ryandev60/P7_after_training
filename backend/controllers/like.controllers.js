const db = require("../models");

exports.updateLike = (req, res, next) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const newLike = req.body;

  db.Like.findOne({
    where: {
      userId: userId,
      postId: postId,
    },
  })
    .then((like) => {
      if (like) {
        db.Like.destroy({
          where: {
            userId: userId,
            postId: postId,
          },
        })
          .then(() => {
            res.status(201).json({ deletelike: "Le like a bien été retirer" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      } else {
        db.Like.create(newLike)
          .then(() => {
            res.status(201).json({ newlike: "Le like a bien été ajouter" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }

      console.log("salut");
    })
    .catch((err) => {
      console.log(err);
    });
};
