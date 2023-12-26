import asyncHandler from '../middlewares/asyncHandler.js';
import WishListModel from '../models/wishlistModel.js';
import { isValidObjectId } from 'mongoose';

const addToWishList = asyncHandler(async (req, res) => {
  const { productId, userId } = req.body;

  if (!isValidObjectId(productId)) {
    return res.status(403).json({ error: 'Invalid product ID' });
  }

  try {
    const wishlist = await WishListModel.findOne({ userId, products: productId });

    if (wishlist) {
      await WishListModel.findByIdAndUpdate(wishlist._id, { $pull: { products: productId } });
    } else {
      await WishListModel.findOneAndUpdate(
        { userId },
        { $push: { products: productId } },
        { upsert: true }
      );
    }

    res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error('Not authorized')
  }
});


const getWishListProducts = asyncHandler(async (req, res) => {
    const wishlist = await WishListModel.findOne({
      userId: req.user._id,
    }).populate({
      path: "products"
    })
    if(wishlist) {
      res.status(200).json(wishlist)
    }else  {
      res.status(404)
      throw new Error('no product found in wishlist')
    }
 });

 const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId, userId } = req.body;

  if (!isValidObjectId(productId)) {
    return res.status(403).json({ error: 'Invalid product ID' });
  }

  try {
    const wishlist = await WishListModel.findOne({ userId, products: productId });

    if (wishlist) {
      // Remove the specified product from the wishlist
      await WishListModel.findByIdAndUpdate(wishlist._id, { $pull: { products: productId } });
      res.status(200).json({ message: 'Product removed from wishlist successfully' });
    } else {
      // If the product is not in the wishlist, return an error
      res.status(404).json({ error: 'Product not found in wishlist' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export { addToWishList, getWishListProducts, removeFromWishlist };


// $pull;  
// $push;