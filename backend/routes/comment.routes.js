const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/",auth, commentController.findAllComment);
router.post("/create",auth, commentController.createComment);
// router.get("/:id", commentController.findOne);
// router.put("/:id", commentController.update);
router.delete("/delete/:id",auth, commentController.deleteComment);

module.exports = router;

