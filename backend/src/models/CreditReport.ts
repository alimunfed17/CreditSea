import mongoose, { Schema, Document } from 'mongoose';

export interface ICreditAccount {
  accountType: string;
  bank: string;
  address: string;
  accountNumber: string;
  amountOverdue: number;
  currentBalance: number;
}

export interface ICreditReport extends Document {
  basicDetails: {
    name: string;
    mobilePhone: string;
    pan?: string;
    creditScore: string;
  };
  reportSummary: {
    totalAccounts: number;
    activeAccounts: number;
    closedAccounts: number;
    currentBalance: number;
    securedAmount: number;
    unsecuredAmount: number;
    last7DaysEnquiries: number;
  };
  creditAccounts: ICreditAccount[];
  createdAt: Date;
  updatedAt: Date;
}

const CreditAccountSchema = new Schema<ICreditAccount>({
  accountType: { type: String, required: true },
  bank: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  accountNumber: { type: String, required: true },
  amountOverdue: { type: Number, required: true },
  currentBalance: { type: Number, required: true },
});

const CreditReportSchema = new Schema<ICreditReport>(
  {
    basicDetails: {
      name: { type: String, required: true },
      mobilePhone: { type: String, required: true },
      pan: { type: String, default: '' },
      creditScore: { type: String, required: true },
    },
    reportSummary: {
      totalAccounts: { type: Number, required: true },
      activeAccounts: { type: Number, required: true },
      closedAccounts: { type: Number, required: true },
      currentBalance: { type: Number, required: true },
      securedAmount: { type: Number, required: true },
      unsecuredAmount: { type: Number, required: true },
      last7DaysEnquiries: { type: Number, required: true },
    },
    creditAccounts: { type: [CreditAccountSchema], required: true },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

export const CreditReport = mongoose.model<ICreditReport>(
  'CreditReport',
  CreditReportSchema
);
