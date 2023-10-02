import dbUtils from '../../../utils/db';
import User from '../../../models/users';

export default async (req, res) => {
  await dbUtils.connectToDatabase();

  if (req.method === 'PUT') {
    try {
      const {productId,userId} = req.body; 
      const user = await User.findById(userId);
      // console.log(user);
      await user.selectedProducts.push(productId);
      await user.save();
      // console.log(user.selectedProducts);
      return res.status(200).json(user.selectedProducts);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
