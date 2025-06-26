const router = require('express').Router();
const ctrl = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/:id', verifyToken, ctrl.getProfile);
router.post('/:id/follow', verifyToken, ctrl.follow);
router.post('/:id/unfollow', verifyToken, ctrl.unfollow);

module.exports = router;
