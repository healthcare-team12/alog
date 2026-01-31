import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import PatientSearchPage from './pages/PatientSearchPage';
import ClinicalViewPage from './pages/ClinicalViewPage';
import FullRecordsPage from './pages/FullRecordsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <PatientSearchPage /> },
      { path: 'patient/:patientId', element: <ClinicalViewPage /> },
      { path: 'patient/:patientId/records', element: <FullRecordsPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
