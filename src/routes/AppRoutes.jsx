import { Navigate, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Create from '../pages/Create';
import Edit from '../pages/Edit';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/transactions" replace />} />
      <Route path="/transactions" element={<Home />} />
      <Route path="/transactions/create" element={<Create />} />
      <Route path="/transactions/:id" element={<Detail />} />
      <Route path="/transactions/:id/edit" element={<Edit />} />
    </Routes>
  );
}
