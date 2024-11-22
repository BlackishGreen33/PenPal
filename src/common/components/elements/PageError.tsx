import { AlertTriangle } from 'lucide-react';

interface PageErrorProps {
  message: string;
}

const PageError: React.FC<PageErrorProps> = ({
  message = '发生了一些错误',
}) => (
  <div className="flex h-full flex-col items-center justify-center">
    <AlertTriangle className="mb-2 size-6 text-muted-foreground" />
    <p className="text-sm font-medium text-muted-foreground">{message}</p>
  </div>
);

export default PageError;
