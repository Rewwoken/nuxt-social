import { z } from 'zod';
import { blockUser } from '~/server/database/user/block';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const query = await getValidatedQuery(event, z.object({
			id: z.string(),
		}).parse);

		const userId = event.context.user.id;
		try {
			await blockUser(userId, query.id);
		}
		catch {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'error/unknown',
			});
		}
	},
});
