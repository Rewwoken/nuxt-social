import { verifyUser } from '~/server/database/verificationCode';
import { codeSchema } from '~/schemas/code';

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, codeSchema.parse);

  try {
    await verifyUser(query.id, query.code);
  }
  catch (err) {
    if (err instanceof Error) {
      if (err.message === 'error/expired') {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'error/expired',
        });
      }
      else if (err.message === 'error/not-found') {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'error/not-found',
        });
      }
      else {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'error/unknown',
        });
      }
    }
    else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'error/unknown',
      });
    }
  }
});