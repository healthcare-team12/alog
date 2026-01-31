import type { Prescription } from '../../types/patient';
import { formatDrug } from '../../utils/formatDrug';

interface Props {
  prescriptions: Prescription[];
}

export default function PrescriptionList({ prescriptions }: Props) {
  if (prescriptions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        현재 처방 약물
      </h3>
      <ul className="space-y-2">
        {prescriptions.map((rx, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
            <span className="text-sm text-gray-700">{formatDrug(rx)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
