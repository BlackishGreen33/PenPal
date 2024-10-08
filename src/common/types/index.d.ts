/* eslint-disable no-unused-vars */
declare type AccessType = ['room:write'] | ['room:read', 'room:presence:write'];

declare type RoomAccesses = Record<string, AccessType>;

declare type UserType = 'creator' | 'editor' | 'viewer';

declare type RoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};

declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

declare type ThreadWrapperProps = { thread: ThreadData<BaseMetadata> };
