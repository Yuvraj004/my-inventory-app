// pages/api/products.js
import dbUtils from '@/utils/db';
import Product from '../../../models/products';
export default async function handler(req, res) {
    await dbUtils.connectToDatabase();
    if (req.method === 'GET') {
        const pros = await Product.find();
        res.status(200).json(pros);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
