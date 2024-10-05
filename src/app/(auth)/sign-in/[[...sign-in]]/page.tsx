import { SignIn } from '@clerk/nextjs';
import { NextPage } from 'next';

const page: NextPage = () => (
  <main className="auth-page">
    <SignIn />
  </main>
);

export default page;
