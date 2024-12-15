import { NextPage } from 'next';

import { HomeNav, TemplatesGallery } from '@/common/components/documents';

// import { useSearchParam } from '@/common/hooks';

const page: NextPage = () => {
  // const [search] = useSearchParam();
  // const { results, status, loadMore } = usePaginatedQuery(
  //   api.documents.get,
  //   { search },
  //   { initialNumItems: 5 }
  // );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 p-4">
        <HomeNav />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        {/*   <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        /> */}
      </div>
    </div>
  );
};

export default page;
