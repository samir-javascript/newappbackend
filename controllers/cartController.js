/*import { Types } from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import CartModel from "../models/cartModel.js";

// POST REQUEST
// ADD ITEMS TO CART;
// /api/cart;
const addToCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const { productId, quantity } = req.body;
  const parsedQuantity = parseInt(quantity, 10);

  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }
  console.log('User ID:', user._id);
  console.log('Product ID:', productId);
  console.log('Quantity:', quantity);
  // Find or create the user's cart
  let cart = await CartModel.findOne({ userId: user._id });

  if (!cart) {
    cart = await CartModel.create({
      userId: user._id,
      items: [{ productId, quantity }],
    });
  }

  // Update quantity if item is already in the cart
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += parsedQuantity;

    if (existingItem.quantity <= 0) {
      // Remove item from the cart if quantity is zero or negative
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    }
  } else {
    // Add new item to the cart
    cart.items.push({ productId, quantity: parsedQuantity });
  }

  // Save the updated cart
  await cart.save();
  
  res.status(200).json({ message: 'Item added to the cart' });
});

/*const getUserCart = asyncHandler(async (req, res)=> {
    const cart = await CartModel.findOne({userId: req.user._id})
    if(cart) {
        res.status(200).json(cart)
    }
    else {
      res.status(404)
      throw new Error('Resource Not Found')
    }
})

const getCartProducts = asyncHandler(async (req, res) => {
  const user = req.user;
  const [cartItems] = await CartModel.aggregate([
    { $match: { userId: new Types.ObjectId(user._id) } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "items.productId",
        as: "product",
      },
    },
    {
      $project: {
        _id: 0,
        id: { $toString: "$_id" }, // Convert _id to string
        totalQty: { $sum: "$items.quantity" },
        products: {
          id: { $toString: { $arrayElemAt: ["$product._id", 0] } }, // Convert product._id to string
          name: { $arrayElemAt: ["$product.name", 0] },
          description: { $arrayElemAt: ["$product.description", 0] },
          image: { $arrayElemAt: ["$product.image", 0] },
          brand: { $arrayElemAt: ["$product.brand", 0] },
          price: { $arrayElemAt: ["$product.price", 0] },
          reviews: { $arrayElemAt: ["$product.reviews", 0] },
          qty: "$items.quantity",
          category: { $arrayElemAt: ["$product.category", 0] },
          countInStock: { $arrayElemAt: ["$product.countInStock", 0] },
          numReviews: { $arrayElemAt: ["$product.numReviews", 0] },
          rating: { $arrayElemAt: ["$product.rating", 0] },
          totalPrice: {
            $multiply: [
              "$items.quantity",
              { $arrayElemAt: ["$product.price", 0] },
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        id: { $first: "$id" },
        totalQty: { $sum: "$totalQty" },
        totalPrice: { $sum: "$products.totalPrice" },
        products: { $push: "$products" },
      },
    },
    {
      $project: {
        _id: 0,
        id: 1,
        totalQty: 1,
        totalPrice: 1,
        products: 1,
      },
    },
  ]);
  res.status(200).json(cartItems);
});

export { addToCart , getCartProducts };
*/



