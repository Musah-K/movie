import express from 'express';
import { createUser, getAllUsers, getCurrentUserProfile, loginUser, updateCurrentUserProfile,logoutCurrentUser } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
const router =  express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllUsers);
router.post('/auth',loginUser);
router.post('/logout', logoutCurrentUser);
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate,updateCurrentUserProfile);

export default router;