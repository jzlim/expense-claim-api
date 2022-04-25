import { model, Schema, Document, Types } from 'mongoose';

export default interface UserToken extends Document {
    userId: Types.ObjectId;
    refreshToken: string;
    isValid: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
      trim: true
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    }
  }
);

export const UserTokenModel = model<UserToken>('UserTokens', schema);
