import { Models } from 'node-appwrite';

export type User = Models.Document & {
  userId: string;
  email: string;
  fileId: string;
  messageId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: string;
};
