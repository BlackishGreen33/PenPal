export const getAccessType = (userType: UserType) => {
  switch (userType) {
    case 'creator':
      return ['room:write'];
    case 'editor':
      return ['room:write'];
    case 'viewer':
      return ['room:read', 'room:presence:write'];
    default:
      return ['room:read', 'room:presence:write'];
  }
};
