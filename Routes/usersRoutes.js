import express from 'express';
import { admin, protect } from '../middlewares/authMiddleware.js';
import {
  getUserById,
  getUserProfile,
  updateUser,
  getUsers,
  updateUserProfile,
  deleteUser,
  logoutUser,
  authUser,
  registerUser,
} from '../controllers/userController.js';
// import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET request for getting the user's profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Login route
router.route('/login').post(authUser);

// Registration route
router.route('/register').post(registerUser);

// Routes for a specific user by ID
router
  .route('/:id')
  .get( protect, admin , getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// Additional routes
router.post('/logout', logoutUser);
router.route('/').get(protect, admin, getUsers);

export default router;