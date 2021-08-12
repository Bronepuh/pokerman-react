import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  settings: [{ type: mongoose.Types.ObjectId, ref: 'Settings' }],
  inventory: [{ type: mongoose.Types.ObjectId, ref: 'Inventory' }],
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel };