import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-6">{children}</main>
  );
}
