import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { CreditCard, User, FileText } from "lucide-react";

type CreditAccount = {
  accountType: string;
  bank: string;
  address: string;
  accountNumber: string;
  amountOverdue: number;
  currentBalance: number;
};

type CreditReportDetail = {
  basicDetails: {
    name: string;
    mobilePhone: string;
    pan: string;
    creditScore: number;
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
  creditAccounts: CreditAccount[];
  createdAt: string;
};

interface ReportDetailUIProps {
  report: CreditReportDetail;
}

export default function ReportDetailsUI({ report }: ReportDetailUIProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Credit Report
        </h1>
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex items-center space-x-2">
            <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Basic Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Name:</strong> {report.basicDetails.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Mobile Phone:</strong> {report.basicDetails.mobilePhone}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>PAN:</strong> {report.basicDetails.pan}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Credit Score:</strong>{" "}
                <span
                  className={`font-semibold ${
                    report.basicDetails.creditScore >= 750
                      ? "text-green-600 dark:text-green-400"
                      : report.basicDetails.creditScore >= 600
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {report.basicDetails.creditScore}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Report Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Total Accounts:</strong> {report.reportSummary.totalAccounts}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Active Accounts:</strong> {report.reportSummary.activeAccounts}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Closed Accounts:</strong> {report.reportSummary.closedAccounts}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Current Balance:</strong> ₹{report.reportSummary.currentBalance.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Secured Amount:</strong> ₹{report.reportSummary.securedAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Unsecured Amount:</strong> ₹{report.reportSummary.unsecuredAmount.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Last 7 Days Enquiries:</strong> {report.reportSummary.last7DaysEnquiries}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
          <CardHeader className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Credit Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-700">
                  <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Bank</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Account Type</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Account Number</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Address</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Current Balance</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Amount Overdue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.creditAccounts.map((acc, i) => (
                  <motion.tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <TableCell className="text-gray-700 dark:text-gray-300">{acc.bank}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{acc.accountType}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{acc.accountNumber}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{acc.address}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">
                      ₹{acc.currentBalance.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className={`${
                        acc.amountOverdue > 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      ₹{acc.amountOverdue.toLocaleString()}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Report generated on {new Date(report.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}