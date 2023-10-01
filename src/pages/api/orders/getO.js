import Order from '../../../models/orders';
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const orders = await Order.find();
        res.status(200).json(orders);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
