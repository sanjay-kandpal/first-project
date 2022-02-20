const express = require('express');

const postsController = require('../controllers/post_controller');
const router = express.Router();
router.get('/posts',postsController.posts);
module.exports = router;