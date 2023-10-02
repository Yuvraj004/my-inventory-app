import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      
    },
    {quantity: {type:Number,default:0}},
  ],

  status:{ type:String,default:"NULL"},
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
// Create an inventory management system only in the order section. Create a frontend, api and db 
// Users can buy one or more than one product.
// Vendors can approve and reject this product.
// Create an inventory management system. Create a frontend, api and db 
// Task Is : - 
// i. Auth Section User, Vendor
// ii. User Can Buy one or more than one product at a time .
// iii. Vendor review this product and approved and reject 
// iv. User Can Track Product.