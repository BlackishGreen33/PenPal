import { format } from 'date-fns';
import { Building2Icon, CircleUserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SiGoogledocs } from 'react-icons/si';

import { TableCell, TableRow } from '@/common/components/ui/table';
import { useWorkspaceId } from '@/common/hooks';
import { type Document } from '@/common/types/documents';

import DocumentMenu from './DocumentMenu';

interface DocumentRowProps {
  document: Document;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ document }) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  return (
    <TableRow
      onClick={() =>
        router.push(`/workspaces/${workspaceId}/documents/${document.$id}`)
      }
      className="cursor-pointer"
    >
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="hidden items-center gap-2 text-muted-foreground md:flex">
        {document.workspaceId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.workspaceId ? '团队文档' : '个人文档'}
      </TableCell>
      <TableCell className="hidden text-muted-foreground md:table-cell">
        {format(new Date(document.$createdAt), 'MMM dd, yyyy')}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={() =>
            window.open(
              `/workspaces/${workspaceId}/documents/${document.$id}`,
              '_blank'
            )
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
