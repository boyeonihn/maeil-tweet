export const API_PATH = {
  ME: '/api/users/me',
  AUTH: 'api/users/auth',
  POST: '/api/posts',
  CREATE: '/api/users/create',
  CONFIRM: '/api/users/confirm',
  LIKE: (postId: string) => `/api/posts/${postId}/like`,
};
