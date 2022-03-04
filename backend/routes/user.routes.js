const auth = require("../middleware/auth.js");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers.js");
const multer = require("../middleware/multer-config");

// Création d'un compte
router.post("/signup", userController.signup);

// Connexion
router.post("/login", userController.login);

//Supression d'un utilisateur

router.delete("/delete", auth, userController.deleteUser);

//Supression d'un utilisateur

router.delete("/delete/admin", auth, userController.deleteUserByAdmin);

// Récupération d'un user

router.get("/getone/:id", auth, userController.getOneUser);

// Récupération de plusieurs users

router.get("/getall", auth, userController.getAll);

// Modification de l'avatar

router.put("/modify/avatar/:id", auth,multer, userController.updateAvatar);

// Modification du prénom

router.put("/modify/firstname/:id", auth, userController.updateFirstName);

// Modification du nom

router.put("/modify/lastname/:id", auth, userController.updateLastName);

// Modification de l'email

router.put("/modify/email/:id", auth, userController.updateEmail);

// Modification du mot de passe

router.put("/modify/password", auth, userController.updatePassword);

// Exportation des routes
module.exports = router;
