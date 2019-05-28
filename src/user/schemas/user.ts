import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: String,
  password: Number,
  email: String,
});
