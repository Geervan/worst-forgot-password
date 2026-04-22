import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Verify from './pages/Verify';
import ResetSuccess from './pages/ResetSuccess';
import Dashboard from './pages/Dashboard';
import FinalPage from './pages/FinalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/home" element={<FinalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
