const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Crée un utilisateur
exports.signup = (req, res) => {
  db.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = {
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: `${req.protocol}://${req.get(
              "host"
            )}/images/user-solid.svg`,
          };

          // Sauvegarder un utilisateur dans la FB
          db.User.create(user)
            .then(() => {
              res.status(201).send({
                message: "L'utilisateur a été créé", ////////////////////
              });
            })
            .catch(() => {
              res.send({
                message: "L'utilisateur n'a pas pu être créé", ////////////////////
              });
            });
        });
      } else {
        res.status(401).send({
          message: "Email déja existant",
        });
      }
    })
    .catch((err) => {
      res.status(401).send({ err });
    });
};

// Connexion utlisateur
exports.login = (req, res, next) => {
  db.User.findOne({
    where: { email: req.body.email },
  }) // On cherche si l'email rentré par l'utilisateur correspond à un email dans la DB
    .then((user) => {
      if (!user) {
        // Si on ne trouve pas d'utilisateur on renvoi une erreur
        return res.status(401).json({ email: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) // On comparer le mot de passe rentré par l'utilisateur avec le mot de passe correspondant hasher du dans la DB
        .then((valid) => {
          if (!valid) {
            // Si ce n'est pas valable
            return res
              .status(401)
              .json({ password: "Mot de passe incorrect !" });
          } // Si c'est valable
          // On renvoie un status 200 avec un token encodé
          res.status(200).json({
            userId: user.id,
            admin: user.admin,
            token: jwt.sign(
              { userId: user.id, admin: user.admin },
              process.env.JWT_SECRET,
              { expiresIn: "24h" } // Durée de validité du token
            ),
          });
        })
        .catch((error) => res.status(505).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); // Erreur serveur
};

//on récupère un utilisateur
exports.getOneUser = (req, res, next) => {
  const id = req.params.id;
  db.User.findOne({ where: { id: id } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAll = (req, res) => {
  db.User.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error }));
};

// Mise à jour de l'avatar

exports.updateAvatar = (req, res, next) => {
  const id = req.params.id;

  const newPost = req.file
    ? {
        ...req.body,
        avatar: `${req.protocol}://${req.get("host")}/images/${
          // Indiqué l'URL de l'images
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  db.User.update(newPost, { where: { id: id } })
    .then(() => {
      res.status(200).json({ message: "User modifié avec SUCCES !" });
    })
    .catch(() => {
      res.status(400).json({ error: "ECHEC de la modification du post" });
    });
};

//Mise à jour du prénom
exports.updateFirstName = (req, res, next) => {
  const firstName = req.body.firstName;
  const id = req.params.id;

  if (firstName != 0) {
    db.User.update({ firstName }, { where: { id: id } })
      .then(() => {
        res.status(200).json({ message: "User modifié avec SUCCES !" });
      })
      .catch(() => {
        res.status(400).json({ error: "ECHEC de la modification du post" });
      });
  }
};

//Mise à jour du nom

exports.updateLastName = (req, res, next) => {
  const lastName = req.body.lastName;
  const id = req.params.id;

  if (lastName != 0) {
    db.User.update({ lastName }, { where: { id: id } })
      .then(() => {
        res.status(200).json({ message: "User modifié avec SUCCES !" });
      })
      .catch(() => {
        res.status(400).json({ error: "ECHEC de la modification du post" });
      });
  }
};

//Mise à jour de l'email

exports.updateEmail = (req, res, next) => {
  const email = req.body.email;
  const id = req.params.id;

  if (email != 0) {
    db.User.update({ email }, { where: { id: id } })
      .then(() => {
        res.status(200).json({ message: "User modifié avec SUCCES !" });
      })
      .catch(() => {
        res.status(400).json({ error: "ECHEC de la modification du post" });
      });
  }
};

//Mise à jour du mot de passe

exports.updatePassword = (req, res, next) => {
  db.User.findOne({ where: { id: req.body.userId } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non enregistré" });
      }
      bcrypt
        //on compare le hash du password
        .compare(req.body.currentPassword, user.password)
        .then((passwordOk) => {
          if (passwordOk === false) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          } else {
            bcrypt
              // on hash le mot de passe
              .hash(req.body.newPassword, 10)
              .then((hash) => {
                db.User.update(
                  {
                    password: hash,
                  },
                  { where: { id: req.body.userId } }
                ).then(() => {
                  res
                    .status(200)
                    .json({ message: "Password modifié avec succès" });
                });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          }
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//Suppression utilisateur

exports.deleteUser = (req, res, next) => {
  const id = req.body.userId;
  const deleteUserPassword = req.body.deleteUserPassword;

  db.User.findOne({ where: { id: id } })
    .then((user) => {
      bcrypt
        //on compare le hash du password
        .compare(deleteUserPassword, user.password)
        .then((passwordOk) => {
          if (passwordOk) {
            db.User.destroy({ where: { id: id } }).then(() => {
              res
                .status(200)
                .json({ message: "Utilisateur supprimer avec succés" });
            });
          }
        })
        .catch(res.status(401).json({ error: "Mot de passe incorrect" }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//Suppression utilisateur par admin

exports.deleteUserByAdmin = (req, res, next) => {
  const id = req.body.userId;
  const deleteUserPassword = req.body.deleteUserPassword;

  db.User.destroy({ where: { id: id } });
};

// db.User.destroy({ where: { id: id } }).then(() => {
//   res
//     .status(200)
//     .json({ message: "Utilisateur supprimer avec succés" });
// });
