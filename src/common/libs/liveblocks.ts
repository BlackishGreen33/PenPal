import { Liveblocks } from '@liveblocks/node';

export const liveblocks = new Liveblocks({
  secret: `sk_${process.env.LIVEBLOCKS_SECRET_KEY as string}`,
});
