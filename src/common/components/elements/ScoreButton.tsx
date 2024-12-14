'use client';

import { BookPlus, Coins, Loader, MonitorPlay } from 'lucide-react';

import { useGetScore } from '@/common/api/scores';
import { DottedSeparator } from '@/common/components/elements';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';

const ScoreButton: React.FC = () => {
  const { data: scoreData, isLoading } = useGetScore();

  if (isLoading) {
    return (
      <div className="flex size-10 items-center justify-center">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!scoreData) {
    return null;
  }

  const { score, freeCount } = scoreData;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Coins className="text-gray-300"></Coins>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <div className="flex flex-col items-start justify-center">
            <p className="flex text-sm font-bold text-neutral-900">
              积分：<p className="text-blue-500">{score}</p>
            </p>
            <p className="flex text-sm font-bold text-neutral-900">
              今日免费次数：<p className="text-blue-500">{freeCount}</p>/10
            </p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem className="flex h-10 cursor-pointer items-center justify-center font-medium">
          <MonitorPlay className="mr-2 size-4" />
          观看广告增加积分
        </DropdownMenuItem>
        <DropdownMenuItem className="flex h-10 cursor-pointer items-center justify-center font-medium text-amber-700">
          <BookPlus className="mr-2 size-4" />
          升级会员
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ScoreButton;
