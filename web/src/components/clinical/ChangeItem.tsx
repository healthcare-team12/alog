import type { ChangeItem as ChangeItemType } from '../../types/patient';

interface Props {
  item: ChangeItemType;
}

const typeStyles = {
  improved: 'bg-green-50 text-green-700 border-green-200',
  worsened: 'bg-amber-50 text-amber-700 border-amber-200',
  unchanged: 'bg-gray-50 text-gray-600 border-gray-200',
};

const typeLabels = {
  improved: '호전',
  worsened: '주의',
  unchanged: '변경',
};

export default function ChangeItemRow({ item }: Props) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-4 py-2.5 ${typeStyles[item.type]}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/60">
          {typeLabels[item.type]}
        </span>
        <span className="text-sm font-medium">{item.field}</span>
      </div>
      <span className="text-sm">{item.description}</span>
    </div>
  );
}
