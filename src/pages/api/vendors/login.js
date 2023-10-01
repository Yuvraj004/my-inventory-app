import connectToDatabase from '../../../utils/db';
import Vendor from '../../../models/vendors';
import { comparePassword, generateToken } from '../../../utils/auth';

export default async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      console.log(username,password);
      const vendor = await Vendor.findOne({ username });

      if (!vendor) {
        return res.status(404).json({ success: false, message: 'Vendor not found' });
      }

      const isPasswordValid = await comparePassword(password, vendor.password);

      if (!isPasswordValid) {
        return res.status  (401).json({ success: false, message: 'Invalid password' });
      }

      const token = generateToken(vendor);

      return res.status(200).json({ success: true, token });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
