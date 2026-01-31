import type { Visit } from '../../types/patient';
import RecordCard from './RecordCard';

interface Props {
  visits: Visit[];
}

export default function RecordList({ visits }: Props) {
  if (visits.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-8">
        기록이 없습니다.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {visits.map((visit) => (
        <RecordCard key={visit.id} visit={visit} />
      ))}
    </div>
  );
}
