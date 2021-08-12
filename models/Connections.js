import mongoose from 'mongoose';

const connectionsSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: 'Room' },
  user: { type: Object },
});

const ConnectionsModel = mongoose.model('Connections', connectionsSchema);

export { ConnectionsModel };
