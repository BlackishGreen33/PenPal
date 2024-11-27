'use client';

import { AlertTriangle } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';

import { Button } from '@/common/components/ui/button';

const ErrorPage: NextPage = () => (
  <div className="flex h-screen flex-col items-center justify-center gap-y-4">
    <AlertTriangle className="size-6 text-muted-foreground" />
    <p className="text-sm text-muted-foreground">发生了一些错误</p>
    <Button variant="secondary" size="sm">
      <Link href="/">返回主页</Link>
    </Button>
  </div>
);

export default ErrorPage;
