import type { Patient } from '../../types/patient';
import { formatDate } from '../../utils/formatDate';

interface Props {
  patient: Patient;
  lastVisitDate: string;
}

export default function PatientSummaryCard({ patient, lastVisitDate }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {patient.name}
          </h2>
          <p className="text-sm text-gray-500">
            {patient.id} · {patient.gender} · {formatDate(patient.birthDate)}생
          </p>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 w-16">주진단</span>
          <span className="text-sm text-gray-900 font-medium">
            {patient.primaryDiagnosis}
          </span>
        </div>
        {lastVisitDate && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 w-16">
              최근 방문
            </span>
            <span className="text-sm text-gray-900">
              {formatDate(lastVisitDate)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
