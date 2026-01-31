import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import SearchMessage from '../components/search/SearchMessage';
import SearchForm from '../components/search/SearchForm';
import { usePatientSearch } from '../hooks/usePatientSearch';

export default function PatientSearchPage() {
  const navigate = useNavigate();
  const { patient, notFound, loading, search } = usePatientSearch();

  useEffect(() => {
    if (patient) {
      navigate(`/patient/${patient.id}`);
    }
  }, [patient, navigate]);

  return (
    <PageContainer>
      <div className="pt-8">
        <h1 className="text-xl font-bold text-gray-900 mb-2">환자 조회</h1>
        <p className="text-sm text-gray-500 mb-6">
          환자 고유번호를 입력하세요.
        </p>

        <SearchMessage />
        <SearchForm onSearch={search} loading={loading} />

        {loading && (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {notFound && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">
              환자를 찾을 수 없습니다.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              환자 고유번호를 정확히 입력해주세요.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
