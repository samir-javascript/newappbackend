import express from 'express'

import { getProductById,   getProducts, getProductsByCategory, createProduct, updateProduct, deleteProduct, createReview, getTopRatedProducts } from '../controllers/productController.js'
import { admin, protect} from '../middlewares/authMiddleware.js'
import checkObjectId from '../middlewares/checkObjectId.js'
const router = express.Router()
 router.route('/').get(getProducts).post( protect, admin,  createProduct)
 router.route('/category/:categoryName').get(getProductsByCategory)
 router.route('/top').get(getTopRatedProducts)
 
 router.route('/:id').get(checkObjectId, getProductById).put(protect, admin, checkObjectId, updateProduct).delete(protect, admin, checkObjectId, deleteProduct)
 router.route('/:id/reviews').post(protect, createReview )

 //router.route('/:category').get(getProductsByCategory)
export default router;