import { initTRPC, TRPCError } from '@trpc/server';

import { getCurrent } from '@/common/libs/actions/auth.actions';

const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const user = await getCurrent();
  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return opts.next({
    ctx: {
      userId: user.$id,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
