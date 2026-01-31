import { createContext, useContext, type ReactNode } from 'react';

interface ClinicInfo {
  hospitalName: string;
  doctorName: string;
}

const ClinicContext = createContext<ClinicInfo>({
  hospitalName: '서울중앙병원',
  doctorName: '정민호',
});

export function ClinicProvider({ children }: { children: ReactNode }) {
  const value: ClinicInfo = {
    hospitalName: '서울중앙병원',
    doctorName: '정민호',
  };

  return (
    <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>
  );
}

export function useClinic(): ClinicInfo {
  return useContext(ClinicContext);
}
