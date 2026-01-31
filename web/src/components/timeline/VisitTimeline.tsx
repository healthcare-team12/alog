import type { Visit } from '../../types/patient';
import TimelineEntry from './TimelineEntry';

interface Props {
  visits: Visit[];
}

export default function VisitTimeline({ visits }: Props) {
  if (visits.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">방문 이력</h3>
      <div>
        {visits.map((visit, i) => (
          <TimelineEntry
            key={visit.id}
            visit={visit}
            isLast={i === visits.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
