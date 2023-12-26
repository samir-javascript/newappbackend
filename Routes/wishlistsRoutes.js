
import express from 'express';
import {  protect } from '../middlewares/authMiddleware.js';
import { addToWishList, getWishListProducts, removeFromWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

// Handle adding a product to the wishlist
router.post('/', protect, addToWishList);

// Handle getting wishlist products
router.get('/', protect, getWishListProducts);

// Handle removing a product from the wishlist
router.delete('/', protect, removeFromWishlist);

export default router;