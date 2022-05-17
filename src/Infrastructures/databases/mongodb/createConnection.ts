import mongoose from 'mongoose';
import {MONGO_URI} from '../../../Commons/config/index';

export const createConnection = () => {
  mongoose.connect(String(MONGO_URI));
};
