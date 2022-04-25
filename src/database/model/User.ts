import { model, Schema, Document } from "mongoose";

export default interface User extends Document {
  username: string;
  email: string;
  password: string;
  fullName: string;
  branchCode: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankCode: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    select: false,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  branchCode: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  bankAccountName: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  bankAccountNumber: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  bankCode: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export const UserModel = model<User>("Users", schema);
