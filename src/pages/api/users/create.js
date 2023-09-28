import connectTo from '../../../utils/db';
import User from '../../../models/users';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  connectTo();
  if (req.method === 'POST') {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      return res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
