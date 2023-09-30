import connectToDatabase from '../../../utils/dbConnect';
import Order from '../../../models/Order';
import User from '../../../models/User';
import Product from '../../../models/Product';
import { authMiddleware } from '@/utils/auth';

const createOrder = authMiddleware(async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { userId } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Get product information from user's cart
      const cartItems = user.temporaryCart;

      if (cartItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart is empty' });
      }

      // Create an order
      const productsInOrder = await Promise.all(
        cartItems.map(async (cartItem) => {
          const product = await Product.findById(cartItem.product);

          if (!product) {
            return res.status(404).json({ success: false, message: `Product not found for ID: ${cartItem.product}` });
          }

          return { productId: cartItem.product, quantity: cartItem.quantity };
        })
      );

      const newOrder = new Order({
        user: userId,
        products: productsInOrder,
        status: 'Pending' // Set the initial status for the order
      });
      // Save the order to the user's profile
      user.orders.push(newOrder);
      await newOrder.save();

      // Clear the user's cart after order is created
      user.temporaryCart = [];
      await user.save();

      return res.status(201).json({ success: true, message: 'Order created successfully', order: newOrder });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
});

export default createOrder;
