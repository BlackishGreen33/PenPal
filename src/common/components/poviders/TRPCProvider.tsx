'use client';

import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';

import { trpc } from '@/app/_trpc/client';
import { absoluteUrl } from '@/common/utils';

interface tRPCProviderProps {
  children: React.ReactNode;
}

const TRPCProvider: React.FC<tRPCProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl('/api/trpc'),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
};

export default TRPCProvider;
