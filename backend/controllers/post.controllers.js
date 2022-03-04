const db = require("../models");

// Créé un Post

exports.create = (req, res) => {
  if (req.body.content === "" && !req.file) {
    throw err;
  }

  console.log(req.body);
  const newPost = req.file
    ? {
        ...req.body,
        attachment: `${req.protocol}://${req.get("host")}/images/${
          // Indiqué l'URL de l'images
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };
  db.Post.create(newPost)
    .then(() => {
      res.status(201).json({ message: "Le post a bien été créé" });
    })
    .catch(() => {
      res.status(400).json({ error: "Le post n'a pas pu être créé" });
    });
};

// Récupérer tout  les Posts

exports.getAll = (req, res) => {
  db.Post.findAll({
    include: [
      {
        model: db.User,
        attributes: ["firstName", "lastName", "avatar", "id"],
      },
      {
        model: db.Comment,
        order: [["createdAt", "DESC"]],

        include: [
          {
            model: db.User,
          },
        ],
      },
      {
        model: db.Like,
        attributes: ["userId"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(500).json({ error }));
};

// Supprimer un post

exports.delete = (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  console.log(postId);

  db.Post.findOne({ where: { id: postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Le post n'a pas été trouver" });
      }
      db.Post.destroy({ where: { id: postId } })
        .then(() => {
          res.status(200).json({ message: "Le post a bien été supprimmer" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getByUser = (req, res) => {
  const userId = req.params.id;
  db.Post.findAll({
    where: { userId: userId },
    include: [
      {
        model: db.User,
        attributes: ["firstName", "lastName", "avatar", "id"],
      },
      {
        model: db.Comment,
        order: [["createdAt", "DESC"]],

        include: [
          {
            model: db.User,
          },
        ],
      },
      {
        model: db.Like,
        attributes: ["userId"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(500).json({ error }));
};
