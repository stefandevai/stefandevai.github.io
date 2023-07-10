import { posts } from '$lib/server/posts';
import { postListImages as images, postImagesFallbacks as fallbacks } from '$lib/server/images';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const newPosts = posts.map((post) => ({
		...post,
		featuredImage: images[post.featuredImage].default,
		featuredImageFallback: fallbacks[post.featuredImage].default,
	}));

	return {
		posts: newPosts,
	};
};
