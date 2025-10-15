import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReportById } from "@/api/api";
import ReportDetailsUI from "@/components/Reports/ReportDetailsUI";

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        if (!id) return;
        const data = await fetchReportById(id);
        setReport(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load report");
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-full">Loading report...</div>;
  if (error || !report) return <div className="text-red-600">{error || "Report not found"}</div>;

  return <ReportDetailsUI report={report} />;
}
