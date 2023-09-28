import connect from '../../../utils/db';
import Vendor from '../../../models/vendors';

const creatVendor = async (req, res) => {
  await connect();

  if (req.method === 'POST') {
    try {
      const newVendor = new Vendor(req.body);
      await newVendor.save();
      return res.status(201).json({ success: true, message: 'Vendor created successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
export default creatVendor;