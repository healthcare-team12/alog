import { useClinic } from '../../contexts/ClinicContext';

export default function Header() {
  const { hospitalName, doctorName } = useClinic();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-base font-semibold text-gray-900">
          {hospitalName}
        </span>
        <span className="text-sm text-gray-600">{doctorName} 의사</span>
      </div>
    </header>
  );
}
