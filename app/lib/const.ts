export const API_PATH = {
  ME: '/api/users/me',
  AUTH: 'api/users/auth',
  POST: '/api/posts',
  CREATE: '/api/users/create',
  CONFIRM: '/api/users/confirm',
  LOGOUT: '/api/users/logout',
  MYPOST: `/api/posts/me`,
  COMMENT: (postId: string) => `/api/posts/${postId}/comment`,
  LIKE: (postId: string) => `/api/posts/${postId}/like`,
};

export const SESSION = 'session';
export const AUTH = 'auth';
