'use client';

import { NextUIProvider } from '@nextui-org/react';

import QueryProvider from './QueryProvider';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => (
  <NextUIProvider>
    <QueryProvider>{children}</QueryProvider>
  </NextUIProvider>
);

export default Provider;
