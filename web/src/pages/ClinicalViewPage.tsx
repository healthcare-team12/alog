import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import PatientSummaryCard from '../components/clinical/PatientSummaryCard';
import PrescriptionList from '../components/clinical/PrescriptionList';
import ChangeHighlights from '../components/clinical/ChangeHighlights';
import FullRecordsButton from '../components/clinical/FullRecordsButton';
import VisitTimeline from '../components/timeline/VisitTimeline';
import { usePatientData } from '../hooks/usePatientData';

export default function ClinicalViewPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { data, loading, notFound } = usePatientData(patientId);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </PageContainer>
    );
  }

  if (notFound || !data) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <p className="text-sm text-gray-600 mb-4">
            환자를 찾을 수 없습니다.
          </p>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            검색으로 돌아가기
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1"
      >
        <span>&larr;</span> 환자 검색
      </button>

      <div className="space-y-4">
        <PatientSummaryCard
          patient={data.patient}
          lastVisitDate={data.lastVisitDate}
        />
        <PrescriptionList prescriptions={data.activePrescriptions} />
        <ChangeHighlights changes={data.recentChanges} />
        <VisitTimeline visits={data.visits} />
        <FullRecordsButton patientId={data.patient.id} />
      </div>
    </PageContainer>
  );
}
