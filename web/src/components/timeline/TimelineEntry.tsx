import type { Visit } from '../../types/patient';
import { formatDate } from '../../utils/formatDate';

interface Props {
  visit: Visit;
  isLast: boolean;
}

export default function TimelineEntry({ visit, isLast }: Props) {
  return (
    <div className="relative flex gap-4">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="h-3 w-3 rounded-full bg-blue-500 border-2 border-white shadow-sm shrink-0 mt-1" />
        {!isLast && <div className="w-0.5 flex-1 bg-gray-200" />}
      </div>

      {/* Content */}
      <div className="pb-6 flex-1">
        <p className="text-sm font-medium text-gray-900">
          {formatDate(visit.date)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {visit.doctorName} 의사
        </p>

        {/* Symptoms */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {visit.symptoms.map((s, i) => {
            const severityColor =
              s.severity === 'severe'
                ? 'bg-amber-100 text-amber-700'
                : s.severity === 'moderate'
                ? 'bg-yellow-50 text-yellow-700'
                : 'bg-gray-100 text-gray-600';
            return (
              <span
                key={i}
                className={`text-xs px-2 py-0.5 rounded-full ${severityColor}`}
              >
                {s.name}
              </span>
            );
          })}
        </div>

        {/* Brief note */}
        {visit.notes.length > 0 && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
            {visit.notes[visit.notes.length - 1].content}
          </p>
        )}
      </div>
    </div>
  );
}
