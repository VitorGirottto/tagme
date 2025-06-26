const router = require('express').Router();
const ctrl = require('../controllers/postController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, ctrl.getFeed);
router.post('/', verifyToken, ctrl.createPost);

module.exports = router;
