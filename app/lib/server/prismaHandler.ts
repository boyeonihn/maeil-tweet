import prismaClient from './prismaClient';

interface UserInfo {
  email: string;
  name: string;
  password: string;
}
export const createUser = async (userInfo: UserInfo) => {
  const user = await prismaClient.user.create({
    data: userInfo,
  });
  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

type User =
  | {
      id: number;
    }
  | undefined;

export const createPost = async (user: User, content: string) => {
  const post = await prismaClient.post.create({
    data: {
      content,
      imageUrl: 'xx',
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  return post;
};

type keywordsType = {
  content: {
    contains: string;
  };
};

type postSearchType = 'all' | 'user' | 'keywords';

export const getPosts = async (
  searchType: postSearchType = 'all',
  userId?: string,
  keywords?: keywordsType[]
) => {
  if (searchType == 'user') {
    const posts = await prismaClient.post.findMany({
      where: {
        userId: +userId!,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    return posts;
  }
  if (searchType === 'keywords') {
    const posts = await prismaClient.post.findMany({
      where: {
        OR: keywords,
        AND: {
          id: {
            not: +userId!,
          },
        },
      },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    return posts;
  } else {
    const posts = await prismaClient.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    return posts;
  }
};

export const findOnePost = async (id: string) => {
  const post = await prismaClient.post.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  });
  return post;
};

interface commentInfo {
  content: string;
  userId: any;
  postId: string;
}

export const createComment = async ({
  content,
  userId,
  postId,
}: commentInfo) => {
  const comment = await prismaClient.comment.create({
    data: {
      content,
      user: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: +postId,
        },
      },
    },
  });
  return comment;
};

export const findComments = async (postId: string) => {
  const comments = await prismaClient.comment.findMany({
    where: {
      post: {
        id: +postId,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  });

  return comments;
};

interface likeRecord {
  postId: number;
  userId: number;
}
export const findLikeRecord = async ({ postId, userId }: likeRecord) => {
  const likeRecord = await prismaClient.like.findFirst({
    where: {
      postId,
      userId,
    },
  });
  return likeRecord;
};

export const handleLikeApi = async ({ userId, postId }: likeRecord) => {
  const likeRecordExists = await findLikeRecord({ userId, postId });

  if (likeRecordExists) {
    await prismaClient.like.delete({
      where: {
        id: likeRecordExists.id,
      },
    });
  } else {
    await prismaClient.like.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  }
};
