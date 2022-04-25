import userController from "@app/controllers/userController";
import checkAuth from "@app/middlewares/checkAuth";
import express from "express";

const router = express.Router();

router.post('/createUser', userController.createUser);
router.post('/login', userController.verifyEmailAndPassword);
// router.post('/token', userController.generateRefreshToken); // access token only is enough for simple login
router.post('/getUserInformation', checkAuth, userController.getUserInformation);
router.get('/pingToken', checkAuth, userController.pingToken);

export default router;