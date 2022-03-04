const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Récupérer tout les posts
router.get("/", auth, multer, postController.getAll);

// Créé un post
router.post("/create",auth, multer, postController.create);

// Supprimer un post
router.delete("/delete/:id",auth, postController.delete);

// Récupérer les posts d'un user

router.get("/getbyuser/:id", auth, postController.getByUser)

module.exports = router;
