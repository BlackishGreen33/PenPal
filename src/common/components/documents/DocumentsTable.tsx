'use client';

import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';

import { useGetDocuments } from '@/common/api/documents';
import { Button } from '@/common/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components/ui/table';
import { useWorkspaceId } from '@/common/hooks';
import { type Document } from '@/common/types/documents';

import { DocumentRow } from '.';

const DocumentsTable: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>();
  const [cursor, setCursor] = useState<string>('');
  const [isMore, setIsMore] = useState<boolean>(false);
  const workspaceId = useWorkspaceId();
  // useEffect(() => {
  const { data } = useGetDocuments({
    workspaceId,
    limit: '5',
    cursor: '',
  });
  // if (data) {
  // if (data.total < 5) setIsMore(false);
  //   setDocuments(data.documents);
  // }
  // }, []);

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-5 px-16 py-6">
      {data?.documents === undefined ? (
        <div className="flex h-24 items-center justify-center">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="whitespace-nowrap">名称</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">分享</TableHead>
              <TableHead className="hidden md:table-cell">创建于</TableHead>
            </TableRow>
          </TableHeader>
          {data?.documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  没有文档
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {data?.documents.map((document) => (
                <DocumentRow key={document.$id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className="flex items-center justify-center">
        {data?.documents && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setCursor(data?.documents[data?.documents.length - 1].$id)
            }
            disabled={!isMore}
          >
            {isMore ? '继续加载' : '无更多数据'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentsTable;
