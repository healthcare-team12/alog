import type { Visit, ChangeItem } from '../types/patient';

export function compareVisits(current: Visit, previous: Visit): ChangeItem[] {
  const changes: ChangeItem[] = [];

  // Compare indicators
  for (const curr of current.indicators) {
    const prev = previous.indicators.find((i) => i.name === curr.name);
    if (prev) {
      if (curr.trend === 'improved') {
        changes.push({
          field: curr.name,
          description: `${prev.value}${prev.unit} → ${curr.value}${curr.unit}`,
          type: 'improved',
        });
      } else if (curr.trend === 'worsened') {
        changes.push({
          field: curr.name,
          description: `${prev.value}${prev.unit} → ${curr.value}${curr.unit}`,
          type: 'worsened',
        });
      }
    }
  }

  // Compare prescriptions - new additions
  for (const curr of current.prescriptions) {
    const prev = previous.prescriptions.find((p) => p.drugName === curr.drugName);
    if (!prev && curr.active) {
      changes.push({
        field: '신규 처방',
        description: `${curr.drugName} ${curr.dosage} 추가`,
        type: 'unchanged',
      });
    } else if (prev && prev.dosage !== curr.dosage) {
      changes.push({
        field: '용량 변경',
        description: `${curr.drugName}: ${prev.dosage} → ${curr.dosage}`,
        type: 'unchanged',
      });
    }
  }

  // Compare symptoms severity
  for (const curr of current.symptoms) {
    const prev = previous.symptoms.find((s) => s.name === curr.name);
    if (prev) {
      const severityOrder = { mild: 1, moderate: 2, severe: 3 };
      const currLevel = severityOrder[curr.severity];
      const prevLevel = severityOrder[prev.severity];
      if (currLevel < prevLevel) {
        changes.push({
          field: curr.name,
          description: `증상 호전`,
          type: 'improved',
        });
      } else if (currLevel > prevLevel) {
        changes.push({
          field: curr.name,
          description: `증상 악화`,
          type: 'worsened',
        });
      }
    }
  }

  return changes;
}
