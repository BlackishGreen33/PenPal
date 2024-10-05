import { SignUp } from '@clerk/nextjs';
import { NextPage } from 'next';

const page: NextPage = () => (
  <main className="auth-page">
    <SignUp />
  </main>
);

export default page;
