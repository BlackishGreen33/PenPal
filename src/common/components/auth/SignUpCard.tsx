'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

import DottedSeparator from '@/common/components/elements/DottedSeparator';
import { Button } from '@/common/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import { registerSchema } from '@/common/schemas/auth';

// import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';
// import { useRegister } from '../../features/auth/api/useRegister';

const SignUpCard: React.FC = () => {
  // const { mutate, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    // mutate({ json: values });
  };

  return (
    <Card className="h-full w-full border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">注册</CardTitle>
        <CardDescription>
          注册前，请先同意我们的{' '}
          <Link href="/privacy">
            <span className="text-blue-700">隐私条例</span>
          </Link>{' '}
          和{' '}
          <Link href="/terms">
            <span className="text-blue-700">服务条款</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="输入用户名称" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="email" placeholder="输入邮箱地址" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="输入密码" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              // disabled={isPending}
              size="lg"
              className="w-full"
            >
              注册
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-7">
        <Button
          // onClick={() => signUpWithGoogle()}
          // disabled={isPending}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          使用 Google 登录
        </Button>
        <Button
          // onClick={() => signUpWithGithub()}
          // disabled={isPending}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          使用 Github 登录
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex items-center justify-center p-7">
        <p>
          已拥有账号？
          <Link href="/sign-in">
            <span className="text-blue-700">&nbsp;登录</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
