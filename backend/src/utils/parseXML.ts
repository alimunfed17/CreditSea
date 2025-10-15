import { parseStringPromise } from "xml2js";

export interface BasicDetails {
  name: string;
  mobilePhone: string;
  pan: string;
  creditScore: string;
}

export interface ReportSummary {
  totalAccounts: number;
  activeAccounts: number;
  closedAccounts: number;
  currentBalance: number;
  securedAmount: number;
  unsecuredAmount: number;
  last7DaysEnquiries: number;
}

export interface CreditAccount {
  accountType: string;
  bank: string;
  address: string;
  accountNumber: string;
  amountOverdue: number;
  currentBalance: number;
}

export interface ParsedCreditReport {
  basicDetails: BasicDetails;
  reportSummary: ReportSummary;
  creditAccounts: CreditAccount[];
}

/**
 * Parse a credit report XML from a string (instead of a file)
 * @param xmlData string containing XML content
 * @returns ParsedCreditReport
 */
export async function parseXMLString(xmlData: string): Promise<ParsedCreditReport> {
  // Parse XML
  const result = await parseStringPromise(xmlData, { explicitArray: false });
  const profile = result.INProfileResponse;

  // ---- Basic Details ----
  const applicant = profile.Current_Application.Current_Application_Details.Current_Applicant_Details;
  const basicDetails: BasicDetails = {
    name: [applicant.First_Name, applicant.Middle_Name1, applicant.Middle_Name2, applicant.Middle_Name3, applicant.Last_Name]
      .filter(Boolean)
      .join(' '),
    mobilePhone: applicant.MobilePhoneNumber,
    pan: applicant.IncomeTaxPan,
    creditScore: profile.SCORE?.BureauScore || '',
  };

  // ---- Report Summary ----
  const caisSummary = profile.CAIS_Account.CAIS_Summary;
  const reportSummary: ReportSummary = {
    totalAccounts: Number(caisSummary.Credit_Account.CreditAccountTotal),
    activeAccounts: Number(caisSummary.Credit_Account.CreditAccountActive),
    closedAccounts: Number(caisSummary.Credit_Account.CreditAccountClosed),
    currentBalance: Number(caisSummary.Total_Outstanding_Balance.Outstanding_Balance_All),
    securedAmount: Number(caisSummary.Total_Outstanding_Balance.Outstanding_Balance_Secured),
    unsecuredAmount: Number(caisSummary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured),
    last7DaysEnquiries: Number(profile.TotalCAPS_Summary?.TotalCAPSLast7Days || 0),
  };

  // ---- Credit Accounts Information ----
  const accounts = profile.CAIS_Account.CAIS_Account_DETAILS;
  const creditAccounts: CreditAccount[] = Array.isArray(accounts)
    ? accounts.map((acc: any) => {
        const holderAddress = acc.CAIS_Holder_Address_Details;
        return {
          accountType: acc.Account_Type,
          bank: acc.Subscriber_Name,
          address: [
            holderAddress.First_Line_Of_Address_non_normalized,
            holderAddress.Second_Line_Of_Address_non_normalized,
            holderAddress.Third_Line_Of_Address_non_normalized,
            holderAddress.City_non_normalized,
            holderAddress.State_non_normalized,
            holderAddress.ZIP_Postal_Code_non_normalized,
          ]
            .filter(Boolean)
            .join(", "),
          accountNumber: acc.Account_Number,
          amountOverdue: Number(acc.Amount_Past_Due),
          currentBalance: Number(acc.Current_Balance),
        };
      })
    : [];

  return { basicDetails, reportSummary, creditAccounts };
}
