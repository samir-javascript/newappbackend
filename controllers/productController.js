import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments();
  
    // Include the category filter if provided in the query
   // const categoryFilter = req.query.category ? { category: req.query.category } : {};
  
    // Use object destructuring to include the keyword and category filters
    const { keyword } = req.query;
    const products = await Product.find({
      ...keyword ? { name: { $regex: keyword, $options: "i" } } : {},
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  });


const getProductById = asyncHandler(async(req,res)=> {
    const product = await Product.findById(req.params.id);
    if(product) {
       return res.status(200).json(product)
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})



const deleteProduct = asyncHandler(async(req,res)=> {
    const product = await Product.findById(req.params.id)
    if(product) {
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: 'product deleted'})
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const getTopRatedProducts = asyncHandler(async(req,res)=> {
    const products = await Product.find({}).limit(3)
    if(products) {
        res.status(200).json(products)
    }else {
        res.status(404)
        throw new Error('No product found')
    }
    
})
const getProductsByCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.params;
  
    // Use find to get all products with the specified category
    const products = await Product.find({ category: categoryName });
  
    if (products && products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: 'No products found for this category' });
    }
  });
  
const createProduct = asyncHandler(async(req,res)=> {
    const product = await new Product({
        name: "sample product",
        user: req.user._id,
        category: "sample category",
        countInStock: 0,
        price: 0,
        brand: "sample brand",
        numReviews: 0,
        description: "sample description",
        image: '/images/sample.jpg'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async(req,res)=> {
    const { name, description, image, countInStock, price, brand, category} = req.body;
     const product = await Product.findById(req.params.id)
     if(product) {
        product.name = name;
        product.image = image;
        product.description = description;
        product.countInStock = countInStock,
        product.price = price;
        product.category = category;
        product.brand = brand;
        const updatedProduct = await product.save()
        res.status(200).json(updatedProduct)
     }else {
        res.status(404)
        throw new Error('product not found')
     }
})



const createReview = asyncHandler(async(req,res)=> {
    const { rating, comment} = req.body;
     const product = await Product.findById(req.params.id)
     if(product) {
         const alreadyReviewed = product.reviews.find((review)=> review.user.toString() === req.user._id.toString())
         if(alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
         }
         const review = {
            name: req.user.name,
            comment,
            rating,
            user: req.user._id
         }
         product.reviews.push(review)
         product.numReviews = product.reviews.length;
         product.rating = product.reviews.reduce((acc, review) => acc + review.rating,0) / product.reviews.length;
         await product.save()
         res.status(201).json({message: 'review Added'});
     }else {
        res.status(404)
        throw new Error('product not found')
     }
})





export { getProducts,  getProductById, getProductsByCategory, createProduct,  updateProduct, deleteProduct, createReview, getTopRatedProducts };