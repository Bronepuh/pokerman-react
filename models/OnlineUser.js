import mongoose from 'mongoose';

const onlineUserSchema = new mongoose.Schema({
  userId: { type: String },
  owner: { type: mongoose.Types.ObjectId, ref: 'Room' },
  user: { type: Object },
});

const OnlineUserModel = mongoose.model('OnlineUser', onlineUserSchema);

export { OnlineUserModel };