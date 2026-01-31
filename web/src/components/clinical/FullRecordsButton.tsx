import { useNavigate } from 'react-router-dom';

interface Props {
  patientId: string;
}

export default function FullRecordsButton({ patientId }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/patient/${patientId}/records`)}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
    >
      전체 기록 조회
    </button>
  );
}
