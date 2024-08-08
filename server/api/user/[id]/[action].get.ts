import { checkBlocking } from '~/server/database/user/block';
import { checkFollowing } from '~/server/database/user/follow';
import { userActionSchema } from '~/server/schemas/user-action';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, userActionSchema.parse);

		const userId = event.context.user.id;
		setResponseStatus(event, 200);

		if (params.action === 'follow') {
			return checkFollowing(userId, params.id);
		}

		if (params.action === 'block') {
			return checkBlocking(userId, params.id);
		}
	},
});