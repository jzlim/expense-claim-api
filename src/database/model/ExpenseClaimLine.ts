import { model, Schema, Document } from 'mongoose';

export default interface ExpenseClaimLine extends Document {
  expenseClaimId: string;
  transactionDate: Date;
  costCenter: string;
  claimItem: string;
  description: string;
  currencyCode: string;
  amount: number;
  gst: number;
  exchangeRate: number;
  totalAmount: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema({
  expenseClaimId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ExpenseClaim'
  },
  transactionDate: {
    type: Date,
    required: true,
  },
  costCenter: {
    type: String,
    required: true,
    trim: true
  },
  claimItem: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  currencyCode: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  gst: {
    type: Number,
    required: true,
    min: 0
  },
  exchangeRate: {
    type: Number,
    required: true,
    min: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
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

// export const ExpenseClaimLineModel = model<ExpenseClaimLine>("ExpenseClaimLines", schema);