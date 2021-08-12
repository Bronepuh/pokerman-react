import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
  title: {type: String},
  description: {type: String},
  power: {type: Array},
  img: {type: String},
  isActive: false,
});

const InventoryModel = mongoose.model('Inventory', inventorySchema);

export { InventoryModel };