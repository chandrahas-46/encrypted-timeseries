// backend/models/timeseriesModel.js
import mongoose from 'mongoose';

const timeseriesSchema = new mongoose.Schema({
  name: String,
  origin: String,
  destination: String,
  secret_key: String,
  timestamp: Date,
});

export const timeseriesModel = mongoose.model('timeseries', timeseriesSchema);
