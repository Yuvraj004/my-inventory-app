import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
