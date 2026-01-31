import { Outlet } from 'react-router-dom';
import { ClinicProvider } from './contexts/ClinicContext';
import Header from './components/layout/Header';

export default function App() {
  return (
    <ClinicProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Outlet />
      </div>
    </ClinicProvider>
  );
}
