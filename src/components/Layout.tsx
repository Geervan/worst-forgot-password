import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="page-container">
      <div className="auth-wrapper animate-fade-in">
        <Outlet />
      </div>
    </div>
  );
}
