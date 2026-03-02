const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/users', userController.createUser);
router.post('/users/:username/orders',verifyJWT, userController.newOrder);
router.post('/users/login', authController.login);


router.patch('/orders/:orderId/status', userController.updateOrderStatus);

router.get('/users/refresh-token', authController.refreshAccessToken);
router.get('/users/logout', authController.logout);
router.get('/users/email/:email',verifyJWT, userController.getUserByEmail);
router.get('/users/:userId/orders',verifyJWT, userController.getOrders);
router.get('/users/username/:username',verifyJWT, userController.getUserByUsername);
router.get('/orders/:orderId',verifyJWT, userController.getOrderDetails);

router.delete('/users/:userId',verifyJWT, userController.deleteUser);

module.exports = router;