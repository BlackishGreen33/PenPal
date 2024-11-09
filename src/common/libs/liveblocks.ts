import { Liveblocks } from '@liveblocks/node';

const liveblocks = new Liveblocks({
  secret: `sk_${process.env.LIVEBLOCKS_SECRET_KEY as string}`,
});

export default liveblocks;
