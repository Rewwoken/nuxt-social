import { prisma } from '~/server/database';

export default defineEventHandler(async (event) => {
  const userId = event.context.userId;

  return prisma.post.findMany({
    where: { authorId: userId },
    include: {
      mediaFiles: true,
      replies: true,
      replyTo: true,
    },
  });
});
