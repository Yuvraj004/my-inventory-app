// import connectToDatabase from '../../../utils/db';
import Order from '../../../models/orders';

export default async (req, res) => {
  // await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { productId, userId } = req.body;

      // Find the user's order (you may need to adjust this based on your data model)
      const order = await Order.findOne({ user: userId, status: 'active' });

      if (!order) {
        return res.status(404).json({ success: false, message: 'No active order found for the user' });
      }

      // Add the product to the order
      order.products.push({ productId, quantity: 1 });
      await order.save();

      return res.status(200).json({ success: true, message: 'Product added to order successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
