import { currentUser } from '@clerk/nextjs/server';
import { Hono } from 'hono';
import { redirect } from 'next/navigation';

import { liveblocks } from '@/common/libs/liveblocks';
import { getUserColor } from '@/common/utils';

const LiveblocksAuth = new Hono().post('/', async (c) => {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect('/docs-sign-in');

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // Get the current user from your database
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info }
  );

  return c.newResponse(body, { status });
});

export default LiveblocksAuth;
