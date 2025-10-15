/// <reference types="jest" />

import fs from "fs/promises";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { parseXMLFile, ParsedCreditReport } from "../src/utils/parseXML.js";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("parseXMLFile", () => {
  const sampleXMLPath = path.join(__dirname, "sampleCreditReport.xml");

  const sampleXML = `
  <INProfileResponse>
    <Current_Application>
      <Current_Application_Details>
        <Current_Applicant_Details>
          <First_Name>John</First_Name>
          <Middle_Name1>H</Middle_Name1>
          <Middle_Name2></Middle_Name2>
          <Middle_Name3></Middle_Name3>
          <Last_Name>Doe</Last_Name>
          <MobilePhoneNumber>9999999999</MobilePhoneNumber>
          <IncomeTaxPan>ABCDE1234F</IncomeTaxPan>
        </Current_Applicant_Details>
      </Current_Application_Details>
    </Current_Application>
    <SCORE>
      <BureauScore>750</BureauScore>
    </SCORE>
    <CAIS_Account>
      <CAIS_Summary>
        <Credit_Account>
          <CreditAccountTotal>3</CreditAccountTotal>
          <CreditAccountActive>2</CreditAccountActive>
          <CreditAccountClosed>1</CreditAccountClosed>
        </Credit_Account>
        <Total_Outstanding_Balance>
          <Outstanding_Balance_All>50000</Outstanding_Balance_All>
          <Outstanding_Balance_Secured>30000</Outstanding_Balance_Secured>
          <Outstanding_Balance_UnSecured>20000</Outstanding_Balance_UnSecured>
        </Total_Outstanding_Balance>
      </CAIS_Summary>
      <CAIS_Account_DETAILS>
        <Account_Type>Home Loan</Account_Type>
        <Subscriber_Name>Bank A</Subscriber_Name>
        <CAIS_Holder_Address_Details>
          <First_Line_Of_Address_non_normalized>123 Main St</First_Line_Of_Address_non_normalized>
          <Second_Line_Of_Address_non_normalized>Apt 4</Second_Line_Of_Address_non_normalized>
          <Third_Line_Of_Address_non_normalized></Third_Line_Of_Address_non_normalized>
          <City_non_normalized>CityX</City_non_normalized>
          <State_non_normalized>StateY</State_non_normalized>
          <ZIP_Postal_Code_non_normalized>12345</ZIP_Postal_Code_non_normalized>
        </CAIS_Holder_Address_Details>
        <Account_Number>1234567890</Account_Number>
        <Amount_Past_Due>1000</Amount_Past_Due>
        <Current_Balance>25000</Current_Balance>
      </CAIS_Account_DETAILS>
    </CAIS_Account>
    <TotalCAPS_Summary>
      <TotalCAPSLast7Days>2</TotalCAPSLast7Days>
    </TotalCAPS_Summary>
  </INProfileResponse>
  `;

  beforeAll(async () => {
    await fs.writeFile(sampleXMLPath, sampleXML, "utf-8");
  });

  afterAll(async () => {
    await fs.unlink(sampleXMLPath);
  });

  it("should parse XML and return a structured credit report", async () => {
    const parsed: ParsedCreditReport = await parseXMLFile(sampleXMLPath);

    expect(parsed.basicDetails.name).toBe("John H Doe");
    expect(parsed.basicDetails.mobilePhone).toBe("9999999999");
    expect(parsed.basicDetails.pan).toBe("ABCDE1234F");
    expect(parsed.basicDetails.creditScore).toBe("750");

    expect(parsed.reportSummary.totalAccounts).toBe(3);
    expect(parsed.reportSummary.activeAccounts).toBe(2);
    expect(parsed.reportSummary.closedAccounts).toBe(1);
    expect(parsed.reportSummary.currentBalance).toBe(50000);
    expect(parsed.reportSummary.securedAmount).toBe(30000);
    expect(parsed.reportSummary.unsecuredAmount).toBe(20000);
    expect(parsed.reportSummary.last7DaysEnquiries).toBe(2);

    expect(parsed.creditAccounts).toHaveLength(1);
    expect(parsed.creditAccounts[0].accountType).toBe("Home Loan");
    expect(parsed.creditAccounts[0].bank).toBe("Bank A");
    expect(parsed.creditAccounts[0].address).toBe("123 Main St, Apt 4, CityX, StateY, 12345");
    expect(parsed.creditAccounts[0].accountNumber).toBe("1234567890");
    expect(parsed.creditAccounts[0].amountOverdue).toBe(1000);
    expect(parsed.creditAccounts[0].currentBalance).toBe(25000);
  });
});
