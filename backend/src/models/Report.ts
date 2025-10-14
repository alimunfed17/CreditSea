import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  type: String,
  bank: String,
  accountNumber: String,
  address: String,
  amountOverdue: Number,
  currentBalance: Number
});

const ReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String },
  pan: { type: String, required: true },
  creditScore: { type: Number },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    recentEnquiries: Number
  },
  accounts: [AccountSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", ReportSchema);
