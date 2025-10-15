import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Upload XML file
export const uploadXML = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get all reports
export const fetchReports = async () => {
  const response = await api.get("/reports");
  return response.data;
};

// Get single report by ID
export const fetchReportById = async (id: string) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

export default api;
