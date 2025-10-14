import ReportsTable from "@/components/Reports/ReportsList";

export default function Reports() {
  const fakeData = [
    {
      id: "1",
      name: "Alice Johnson",
      pan: "ABCDE1234F",
      creditScore: 750,
      date: "2025-10-10",
      reportLink: "#"
    },
    {
      id: "2",
      name: "Bob Smith",
      pan: "XYZAB5678K",
      creditScore: 680,
      date: "2025-10-11",
      reportLink: "#"
    },
    {
      id: "3",
      name: "Charlie Brown",
      pan: "LMNOP9876Q",
      creditScore: 710,
      date: "2025-10-12",
      reportLink: "#"
    }
  ];

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Credit Reports</h1>
      <ReportsTable data={fakeData} />
    </div>
  );
}
