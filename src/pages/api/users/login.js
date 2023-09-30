import connectToDatabase from '../../../utils/db';
import User from '../../../models/users';
import { comparePassword, generateToken } from '../../../utils/auth';

export default async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      const token = generateToken(user);

      return res.status(200).json({ success: true, token });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
