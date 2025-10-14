import { parseStringPromise } from "xml2js";

export interface BasicDetails {
  Name: string;
  Mobile: string;
  PAN: string;
  CreditScore: number;
}

export interface ReportSummary {
  TotalAccounts: number;
  ActiveAccounts: number;
  ClosedAccounts: number;
  CurrentBalance: number;
  SecuredAmount: number;
  UnsecuredAmount: number;
  RecentEnquiries: number;
}

export interface CreditAccount {
  type: string;
  bank: string;
  accountNumber: string;
  address: string;
  amountOverdue: number;
  currentBalance: number;
}


export interface ParsedCreditReport {
  name: string;
  mobile: string;
  pan: string;
  creditScore: number;
  reportSummary: {
    totalAccounts: number;
    activeAccounts: number;
    closedAccounts: number;
    currentBalance: number;
    securedAmount: number;
    unsecuredAmount: number;
    recentEnquiries: number;
  };
  accounts: CreditAccount[];
}

export const parseXML = async (xmlData: string): Promise<ParsedCreditReport> => {
  try {
    const result = await parseStringPromise(xmlData, { explicitArray: false }) as any;

    const basic = result.CreditReport.BasicDetails;
    const summary = result.CreditReport.ReportSummary;
    const accountsData = result.CreditReport.CreditAccounts.Account;
    const accountsArray = Array.isArray(accountsData) ? accountsData : [accountsData];

    return {
      name: basic.Name,
      mobile: basic.Mobile,
      pan: basic.PAN,
      creditScore: Number(basic.CreditScore),
      reportSummary: {
        totalAccounts: Number(summary.TotalAccounts),
        activeAccounts: Number(summary.ActiveAccounts),
        closedAccounts: Number(summary.ClosedAccounts),
        currentBalance: Number(summary.CurrentBalance),
        securedAmount: Number(summary.SecuredAmount),
        unsecuredAmount: Number(summary.UnsecuredAmount),
        recentEnquiries: Number(summary.RecentEnquiries),
      },
      accounts: accountsArray.map((acc: any) => ({
        type: acc.Type,
        bank: acc.Bank,
        accountNumber: acc.AccountNumber,
        address: acc.Address,
        amountOverdue: Number(acc.AmountOverdue),
        currentBalance: Number(acc.CurrentBalance),
      })),
    };
  } catch (error: any) {
    throw new Error("Failed to parse XML: " + error.message);
  }
};
