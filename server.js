import path from 'path'
import express from 'express';
//import Stripe from 'stripe';
import productsRoutes from './Routes/productsRoutes.js';
import usersRoutes from './Routes/usersRoutes.js';
import uploadsRoutes from './Routes/uploadsRoutes.js'
import ordersRoutes from './Routes/ordersRoutes.js';
import wishlistsRoutes from './Routes/wishlistsRoutes.js'
//import cartRoutes from './Routes/cartRoutes.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDb } from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

//const stripe = new Stripe('sk_test_51OKKjwCOUHcaY5nV8mgPFlAFHcHdwZcLNFUZRw1zwbm9ghaUefBa9dDHCsSdOUIDHhYJKnWMirwu4odQ2QGbSHow00CqxHQvSS');
dotenv.config();
const app = express();
const PORT = 5000;
connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));



app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
/*app.post('/checkout', async (req, res) => {
  try {
    const { items } = req.body;
    console.log('Received cart items:', items);

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [`${item.image}`],
          id: item.id, // Update here to include the image URL
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Checkout Session:', error);
    res.status(500).send('Internal Server Error');
  }
})*/
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/uploads', uploadsRoutes)
app.use('/api/add-to-wishlist', wishlistsRoutes)
if(process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '/frontend/build')));
   app.get('*', (req,res)=> {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
   })
}else {
  app.get('/', (req, res) => {
    res.send('hello world 2024 is coming');
  });
}
//app.use('/api/cart', cartRoutes)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`APP IS RUNNING ON PORT ${PORT}`));
