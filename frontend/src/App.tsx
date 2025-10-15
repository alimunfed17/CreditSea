import { Route, Routes, useLocation } from 'react-router-dom';
import Uploads from './pages/Uploads';
import Reports from './pages/Reports';
import Header from './components/Common/Header';
import Home from './pages/Home';
import ReportDetails from './pages/ReportDetails';

export default function App() {
  const location = useLocation();

  const hideHeader = location.pathname.startsWith('/reports/') && location.pathname.split('/').length === 3;

  return (
    <div className="h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
        </Routes>
      </main>
    </div>
  );
}
