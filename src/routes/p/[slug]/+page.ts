import { postsComponents } from '$lib/helpers/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	const component = postsComponents[data.post.filepath];

	return {
		post: data.post,
		component: component.default,
	};
};
