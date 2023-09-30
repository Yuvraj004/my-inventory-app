import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  role: String,
  createdAt: { type: Date, default: Date.now },
  purchasedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  trackedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
