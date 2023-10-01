import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email:{ type: String, unique: true },
  password: String,
  role: String,
  uploadedProducts :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
