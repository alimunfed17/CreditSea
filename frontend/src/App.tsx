import { Route, Routes } from 'react-router-dom';
import Uploads from './pages/Uploads';
import Reports from './pages/Reports';
import Header from './components/Common/Header';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}
