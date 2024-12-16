import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVertical,
  TrashIcon,
} from 'lucide-react';

import { Button } from '@/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';

import { RemoveDialog, RenameDialog } from '.';

interface DocumentMenuProps {
  documentId: string;
  title: string;
  onNewTab: (id: string) => void;
}

const DocumentMenu: React.FC<DocumentMenuProps> = ({
  documentId,
  title,
  onNewTab,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full">
        <MoreVertical className="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <RenameDialog documentId={documentId} initialTitle={title}>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
        >
          <FilePenIcon className="mr-2 size-4" />
          重新命名
        </DropdownMenuItem>
      </RenameDialog>
      <RemoveDialog documentId={documentId}>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
        >
          <TrashIcon className="mr-2 size-4" />
          删除
        </DropdownMenuItem>
      </RemoveDialog>
      <DropdownMenuItem onClick={() => onNewTab(documentId)}>
        <ExternalLinkIcon className="mr-2 size-4" />
        在新分页中开启
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default DocumentMenu;
