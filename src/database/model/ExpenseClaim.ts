import { model, Schema, Document } from 'mongoose';
import ExpenseClaimLine from './ExpenseClaimLine';

export default interface ExpenseClaim extends Document {
  userId: string;
  claimDate: Date;
  bankAccountName: string;
  bankAccountNumber: string;
  bankCode: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  expenseClaimLines: ExpenseClaimLine[];
  totalAmount: number;
}

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  claimDate: {
    type: Date,
    required: true,
  },
  bankAccountName: {
    type: String,
    required: true,
    trim: true
  },
  bankAccountNumber: {
    type: String,
    required: true,
    trim: true
  },
  bankCode: {
    type: String,
    required: true,
    trim: true
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
  expenseClaimLines: [
    {
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
      }
    }
  ]
});

export const ExpenseClaimModel = model<ExpenseClaim>("ExpenseClaim", schema);