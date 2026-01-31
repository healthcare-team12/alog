import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import RecordList from '../components/records/RecordList';
import { usePatientData } from '../hooks/usePatientData';
import { useAuditLog } from '../hooks/useAuditLog';

export default function FullRecordsPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { data, loading, notFound } = usePatientData(patientId);
  const { logViewRecords } = useAuditLog();

  useEffect(() => {
    if (patientId) {
      logViewRecords(patientId);
    }
  }, [patientId, logViewRecords]);

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
        onClick={() => navigate(`/patient/${patientId}`)}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1"
      >
        <span>&larr;</span> 진료 요약
      </button>

      <div className="mb-4">
        <h1 className="text-lg font-bold text-gray-900">
          {data.patient.name} - 전체 진료 기록
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          총 {data.visits.length}건의 방문 기록
        </p>
      </div>

      <RecordList visits={data.visits} />
    </PageContainer>
  );
}
