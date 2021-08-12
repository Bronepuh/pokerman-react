import mongoose from 'mongoose';

const msgSchema = new mongoose.Schema({
  
  ownerRoom: [{ type: mongoose.Types.ObjectId, ref: 'Room' }],
  ownerUser: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

const msgModel = mongoose.model('Message', msgSchema);

export { msgModel };