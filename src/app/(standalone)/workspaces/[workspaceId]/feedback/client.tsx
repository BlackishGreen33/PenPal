'use client';

import Giscus from '@giscus/react';

const FeedbackClient: React.FC = () => (
  <Giscus
    id="penpal-feedback"
    repo="BlackishGreen33/PenPal"
    repoId="R_kgDOM76nGw"
    category="General"
    categoryId="DIC_kwDOM76nG84ClOTp"
    mapping="url"
    term="欢迎来到 PenPal 反馈平台！"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    theme="light"
    lang="zh-CN"
    loading="lazy"
  />
);

export default FeedbackClient;
