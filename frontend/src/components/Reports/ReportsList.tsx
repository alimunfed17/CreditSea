import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type CreditReport = {
  id: string;
  name: string;
  creditScore: number;
  date: string;
};

interface CreditReportTableProps {
  data: CreditReport[];
}

export default function ReportsList({ data }: CreditReportTableProps) {
  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "bg-green-100 text-green-800";
    if (score >= 650) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md p-4">
      <Table>
        <TableHeader className="bg-gray-900">
          <TableRow>
            <TableHead className="text-left font-semibold text-gray-200">#</TableHead>
            <TableHead className="text-left font-semibold text-gray-200">Name</TableHead>
            <TableHead className="text-left font-semibold text-gray-200">Credit Score</TableHead>
            <TableHead className="text-left font-semibold text-gray-200">Date</TableHead>
            <TableHead className="text-left font-semibold text-gray-200">Report</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((report, index) => (
            <TableRow
              key={report.id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors duration-200`}
            >
              {/* Row number */}
              <TableCell className="font-medium">{index + 1}</TableCell>

              {/* Name */}
              <TableCell className="font-medium">{report.name}</TableCell>

              {/* Credit Score */}
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${getCreditScoreColor(report.creditScore)}`}
                >
                  {report.creditScore}
                </span>
              </TableCell>

              {/* Date */}
              <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>

              {/* View button */}
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-blue-50 text-blue-600 border-blue-600"
                  onClick={() => alert(`View report for ${report.name}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
