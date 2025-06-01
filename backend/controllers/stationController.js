import Station from '../models/stationModel.js';

export const createStation = async (req, res) => {
  const { name, location, status, powerOutput, connectorType } = req.body;
  try {
    const station = await Station.create({
      name,
      location,
      status,
      powerOutput,
      connectorType,
      createdBy: req.userId
    });
    res.json({ success: true, station });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json({ success: true, stations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateStation = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await Station.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, station });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteStation = async (req, res) => {
  const { id } = req.params;
  try {
    await Station.findByIdAndDelete(id);
    res.json({ success: true, message: 'Station deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
