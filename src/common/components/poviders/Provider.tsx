'use client';

import QueryProvider from './QueryProvider';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => (
  <QueryProvider>{children}</QueryProvider>
);

export default Provider;
