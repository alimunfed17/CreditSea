import { useEffect, useState } from "react";
import ReportsList from "@/components/Reports/ReportsList";
import { fetchReports } from "@/api/api";

type CreditReport = {
  id: string;
  name: string;
  creditScore: number;
  date: string;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<CreditReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();
        
        const mappedData: CreditReport[] = data.map((item: any) => ({
          id: item._id || item.id,
          name: item.basicDetails?.name || "",
          creditScore: Number(item.basicDetails?.creditScore || 0),
          date: item.createdAt || item.date,
        }));

        setReports(mappedData);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) return <div>Loading reports...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="flex-1 w-full p-4">
      <div className="w-3/4 mx-auto">
        <ReportsList data={reports} />
      </div>
    </div>
  );
}
