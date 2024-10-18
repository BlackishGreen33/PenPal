/* eslint-disable simple-import-sort/imports */
import { useIsThreadActive } from '@liveblocks/react-lexical';
import { Composer, Thread } from '@liveblocks/react-ui';
import { useThreads } from '@liveblocks/react/suspense';

import { cn } from '@/common/utils';

const ThreadWrapper: React.FC<ThreadWrapperProps> = ({ thread }) => {
  const isActive = useIsThreadActive(thread.id);

  return (
    <Thread
      thread={thread}
      data-state={isActive ? 'active' : null}
      className={cn(
        'w-full max-w-[800px] border border-dark-300 bg-dark-200 shadow-sm transition-all lg:w-[350px]',
        isActive && '!border-blue-500 shadow-md',
        thread.resolved && 'opacity-40'
      )}
    />
  );
};

const Comments: React.FC = () => {
  const { threads } = useThreads();

  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center space-y-4 lg:w-fit">
      <Composer className="w-full max-w-[800px] border border-dark-300 bg-dark-200 shadow-sm lg:w-[350px]" />
      {threads.map((thread) => (
        <ThreadWrapper key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default Comments;
