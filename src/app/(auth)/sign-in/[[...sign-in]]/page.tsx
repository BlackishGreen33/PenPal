import { SignIn } from '@clerk/nextjs';
import { NextPage } from 'next';

const page: NextPage = () => (
  <main className="flex h-screen w-full flex-col items-center justify-center gap-10">
    <SignIn />
  </main>
);

export default page;
