'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { OAuthProvider } from 'node-appwrite';

import { createAdminClient } from './appwrite';

export const signUpWithGithub = async () => {
  const { account } = await createAdminClient();

  const origin = (await headers()).get('origin');

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}/oauth`,
    `${origin}/sign-up`
  );

  return redirect(redirectUrl);
};

export const signUpWithGoogle = async () => {
  const { account } = await createAdminClient();

  const origin = (await headers()).get('origin');

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/sign-up`
  );

  return redirect(redirectUrl);
};
