// pages/api/products.js
import dbUtils from '@/utils/db';
import Product from '../../../models/products';
import User from '../../../models/users';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    await dbUtils.connectToDatabase();
    
    if (req.method === 'GET') {
        // Step 1: Retrieve the user's ID from the token
        const token = localStorage.getItem('token'); // Assuming you have stored the token in localStorage
        const decodedToken = jwt.verify(token, 'jaadu'); // Use the same secret key used for generating the token
        const userId = decodedToken.userId; // Assuming the user ID is stored in the token as userId
        
        // Step 2: Find the user in the database using their ID
        const user = await User.findById(userId); // Assuming you have a User model
        
        // Step 3: Retrieve the list of selected products associated with that user
        const selectedProducts = user.selectedProducts; // Assuming selectedProducts is an array of product IDs in the User model

        // Use the selectedProducts list to filter the products
        const selectedProductsList = await Product.find({ _id: { $in: selectedProducts } });

        res.status(200).json(selectedProductsList);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
