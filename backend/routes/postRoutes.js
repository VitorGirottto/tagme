const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, postController.createPost);
router.get('/', verifyToken, postController.getPosts);
router.post('/:postId/like', verifyToken, postController.likePost);
router.delete('/:postId', verifyToken, postController.deletePost);

module.exports = router;
