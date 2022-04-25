import { model, Schema, Document } from 'mongoose';

export default interface ClaimItem extends Document {
  glCode: string;
  description: string;
  remarks: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  glCode: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  remarks: {
    type: String,
    trim: true,
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

export const ClaimItemModel = model<ClaimItem>("ClaimItems", schema);