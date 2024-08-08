import { unBookmarkPost, unLikePost } from '~/server/database/post';
import { postActionSchema } from '~/server/schemas/post-action';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, postActionSchema.parse);

		const userId = event.context.user.id;
		setResponseStatus(event, 200);

		if (params.action === 'like') {
			return unLikePost(userId, params.id);
		}

		if (params.action === 'bookmark') {
			return unBookmarkPost(userId, params.id);
		}
	},
});