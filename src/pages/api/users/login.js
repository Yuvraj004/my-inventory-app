import dbUtils from '../../../utils/db';
import User from '../../../models/users';
import { comparePassword, generateToken } from '../../../utils/auth';

export default async (req, res) => {
  await dbUtils.connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      // console.log(1);
      const user = await User.findOne({username: username });
      // console.log(2);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      // console.log(3);
      // const isPasswordValid = await comparePassword(password, user.password);
      // console.log(password,user.password);
      // if (!isPasswordValid) {
      if(password !== user.password){
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }
      // console.log(4);
      const token = generateToken(user);
      // Store the token in session storage
      // Note: Make sure this code is executed on the client side
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('token', token);
      }
      console.log(`token:${token}`);
      // console.log(5);
      return res.status(200).json({ success: true, token });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
