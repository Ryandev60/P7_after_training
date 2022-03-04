const express = require('express');
const likeController = require('../controllers/like.controllers');
const auth = require('../middleware/auth');
const router = express.Router();


router.put('/update', auth, likeController.updateLike);


module.exports = router;

