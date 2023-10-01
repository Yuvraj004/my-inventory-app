// pages/api/products.js

import { getCollection } from '../../../utils/db';
import Product from '../../../models/products';
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const pros = await Product.find();
        // .then(posts => {
        //     res.json({ posts })
        //     console.log(posts)
        // })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // const products = await getProducts();
        res.status(200).json(pros);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

async function getProducts() {
    const products = await getCollection('products');
    return products.find();
}
