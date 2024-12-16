'use client';

import { NextPage } from 'next';

import {
  DocumentsTable,
  HomeNav,
  TemplatesGallery,
} from '@/common/components/documents';

const page: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 p-4">
        <HomeNav />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable />
      </div>
    </div>
  );
};

export default page;
