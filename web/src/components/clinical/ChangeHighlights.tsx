import type { ChangeItem } from '../../types/patient';
import ChangeItemRow from './ChangeItem';

interface Props {
  changes: ChangeItem[];
}

export default function ChangeHighlights({ changes }: Props) {
  if (changes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        최근 변화 사항
      </h3>
      <div className="space-y-2">
        {changes.map((item, i) => (
          <ChangeItemRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
