import type { Visit } from '../../types/patient';
import { formatDate, formatDateTime } from '../../utils/formatDate';
import { formatDrug } from '../../utils/formatDrug';
import PatientEntryBadge from './PatientEntryBadge';
import DoctorEntryBadge from './DoctorEntryBadge';

interface Props {
  visit: Visit;
}

export default function RecordCard({ visit }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          {formatDate(visit.date)}
        </h3>
        <span className="text-xs text-gray-500">{visit.doctorName} 의사</span>
      </div>

      {/* Symptoms */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 mb-1.5">증상</p>
        <div className="flex flex-wrap gap-1.5">
          {visit.symptoms.map((s, i) => {
            const badge =
              s.source === 'patient' ? (
                <PatientEntryBadge />
              ) : (
                <DoctorEntryBadge />
              );
            const severityText =
              s.severity === 'severe'
                ? '(심함)'
                : s.severity === 'moderate'
                ? '(보통)'
                : '(경미)';
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1"
              >
                {s.name} {severityText}
                {badge}
              </span>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      {visit.indicators.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-1.5">검사 수치</p>
          <div className="grid grid-cols-2 gap-2">
            {visit.indicators.map((ind, i) => {
              const trendColor =
                ind.trend === 'improved'
                  ? 'text-green-600'
                  : ind.trend === 'worsened'
                  ? 'text-amber-600'
                  : 'text-gray-600';
              return (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 rounded px-3 py-1.5"
                >
                  <span className="text-xs text-gray-600">{ind.name}</span>
                  <span className={`text-xs font-medium ${trendColor}`}>
                    {ind.value}
                    {ind.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prescriptions */}
      {visit.prescriptions.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-1.5">처방</p>
          <ul className="space-y-1">
            {visit.prescriptions.map((rx, i) => (
              <li key={i} className="flex items-center gap-2 text-xs">
                <span
                  className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                    rx.active ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
                <span className={rx.active ? 'text-gray-700' : 'text-gray-400'}>
                  {formatDrug(rx)}
                  {!rx.active && ' (종료)'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Notes */}
      {visit.notes.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1.5">기록</p>
          <div className="space-y-2">
            {visit.notes.map((note, i) => (
              <div key={i} className="flex items-start gap-2">
                {note.source === 'patient' ? (
                  <PatientEntryBadge />
                ) : (
                  <DoctorEntryBadge />
                )}
                <div className="flex-1">
                  <p className="text-xs text-gray-700">{note.content}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {formatDateTime(note.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
