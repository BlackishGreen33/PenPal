import { ArrowRight } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { MaxWidthWrapper } from '@/common/components/elements';
import { Button, buttonVariants } from '@/common/components/ui/button';

const HomePage: NextPage = () => (
  <>
    <nav className="flex items-center justify-between px-10 pt-5">
      <Image src="/logo.svg" alt="logo" width={152} height={56} />
      <div className="flex gap-2">
        <Button variant="secondary">
          <Link href="/price">升级</Link>
        </Button>
        <Button variant="primary">
          <Link href="/sign-up">开始体验</Link>
          <ArrowRight className="ml-1.5 h-5 w-5" />
        </Button>
      </div>
    </nav>
    <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
          PenPal 当前已经开放使用！
        </p>
      </div>
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
        通过 <span className="text-blue-600">在线文档</span> 与 AI
        机器人对话，构建团队知识库。
      </h1>
      <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
        PenPal
        让你通过简单的操作，快速搭建团队空间，将知识沉淀为结构化文档，实现知识共享与协作。
      </p>
      <Link
        className={buttonVariants({
          size: 'lg',
          className: 'mt-5',
        })}
        href="/workspaces"
        target="_blank"
      >
        开始使用 <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </MaxWidthWrapper>
    <div>
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="/dashboard-preview.jpg"
                  alt="product preview"
                  width={1364}
                  height={866}
                  quality={100}
                  className="rounded-md bg-white p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-8 md:p-20"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
    <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
      <div className="mb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            在几分钟内开始使用
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            快速构建团队知识库从未如此简单
          </p>
        </div>
      </div>
      <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
        <li className="md:flex-1">
          <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
            <span className="text-sm font-medium text-blue-600">第 1 步</span>
            <span className="text-xl font-semibold">注册您的账户</span>
            <span className="mt-2 text-zinc-700">
              可以选择从免费计划开始，或者选择我们的{' '}
              <Link
                href="/pricing"
                className="text-blue-700 underline underline-offset-2"
              >
                专业计划
              </Link>
              。
            </span>
          </div>
        </li>
        <li className="md:flex-1">
          <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
            <span className="text-sm font-medium text-blue-600">第 2 步</span>
            <span className="text-xl font-semibold">创建团队空间</span>
            <span className="mt-2 text-zinc-700">
              我们的团队空间是您的知识库的中心，您可以在这里创建文档、收集信息、与团队成员共享知识。
            </span>
          </div>
        </li>
        <li className="md:flex-1">
          <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
            <span className="text-sm font-medium text-blue-600">第 3 步</span>
            <span className="text-xl font-semibold">开始 AI 对话</span>
            <span className="mt-2 text-zinc-700">
              就是这么简单，今天就来试试 PenPal 吧，真的不到 3 分钟。
            </span>
          </div>
        </li>
      </ol>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              src="/file-upload-preview.jpg"
              alt="uploading preview"
              width={1419}
              height={732}
              quality={100}
              className="rounded-md bg-white p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-8 md:p-20"
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
