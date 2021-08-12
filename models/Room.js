import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Messages' }],
  users: [{ type: Object }],
});

const RoomModel = mongoose.model('Room', roomSchema);

export { RoomModel };