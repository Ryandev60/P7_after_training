const db = require("../models");

exports.createComment = (req, res) => {
  // on test si la requête contient un fichier

  const newComment = {
    ...req.body,
  };
  console.log(newComment);

  db.Comment.create(newComment)
    .then(() => {
      res.status(201).json({ message: "Le commentaire a été créé" });
    })
    .catch(() => {
      res.status(400).json({ message: "Le post n'a pas pu être créé" });
    });
};

exports.findAllComment = (req, res, next) => {
  db.Comment.findAll({
    include: [
      {
        model: db.User,
        attributes: ["firstName", "lastName"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteComment = (req, res) => {
  console.log(req.params.id);
  const commentId = req.params.id;

  db.Comment.findOne({ where: { id: commentId } })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ error: "Le commentaire n'a pas été trouver" });
      }
      db.Comment.destroy({ where: { id: commentId } })
        .then(() => {
          res.status(200).json({ message: "Le commentaire a bien été supprimmer" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
