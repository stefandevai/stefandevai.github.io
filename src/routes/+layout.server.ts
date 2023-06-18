export const prerender = true;

import type { PageServerLoad } from './$types';
import { posts } from '$lib/server/posts';

export const load: PageServerLoad = async () => {
	return {
		posts
	};
};
