import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  powerOutput: { type: Number, required: true }, // kW
  status: { type: String, required:true },
  connectorType: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const Station = mongoose.models.Station || mongoose.model('Station', stationSchema);
export default Station;
