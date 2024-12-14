'use client';

import IframeResizer from '@iframe-resizer/react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useUpdateScore } from '@/common/api/scores';
import { PageLoader } from '@/common/components/elements';
import { Button } from '@/common/components/ui/button';

const AdsClient: NextPage = () => {
  const bvid = 'BV1Vi421r7k5';
  const cid = 1658632039;

  const [canClick, setCanClick] = useState(false);
  const [waitTime, setWaitTime] = useState(10);
  const { mutate, isPending } = useUpdateScore();

  const router = useRouter();

  useEffect(() => {
    if (waitTime > 0) {
      const timer = setTimeout(() => {
        setWaitTime(waitTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (waitTime === 0) {
      setCanClick(true);
    }
  }, [waitTime]);

  if (isPending) {
    return <PageLoader />;
  }

  const handleClick = () => {
    mutate({
      form: {
        operator: 'add',
      },
    });
    router.push('/workspaces');
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <IframeResizer
        src={`//player.bilibili.com/player.html?isOutside=true&aid=347243364&bvid=${bvid}&cid=${cid}&p=1&autoplay=true`}
        scrolling={false}
        style={{ border: 0, width: '1280px', height: '720px' }}
        frameBorder="no"
        allowFullScreen={true}
        aria-controls="video-player"
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        license=""
      />
      <Button
        variant={canClick ? 'primary' : 'muted'}
        disabled={!canClick}
        onClick={handleClick}
      >
        {canClick ? '跳过广告' : `等待 ${waitTime} 秒后可跳过广告...`}
      </Button>
    </div>
  );
};

export default AdsClient;
