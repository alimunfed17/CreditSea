import { Route, Routes } from 'react-router-dom';
import Uploads from './pages/Uploads';
import Reports from './pages/Reports';
import Header from './components/Common/Header';

export default function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/uploads" element={<Uploads />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </main>
  )
}