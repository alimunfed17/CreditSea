import { Route, Routes } from 'react-router-dom';
import './App.css';
import Uploads from './pages/Uploads';
import Reports from './pages/Reports';

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/uploads" element={<Uploads />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </main>
  )
}