import connect from '../../../utils/db';
import Order from '../../../models/Order';

const createOrder = async (req, res) => {
  await connect();

  if (req.method === 'POST') {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      return res.status(201).json({ success: true, message: 'Order created successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
export default createOrder;