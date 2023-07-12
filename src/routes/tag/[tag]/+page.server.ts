import { error } from '@sveltejs/kit';
import { posts } from '$lib/server/posts';
import { postListImages as images, postImagesFallbacks as fallbacks } from '$lib/server/images';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const tag = params.tag;

	const filteredPosts = posts
		.filter((post) => post.language === tag || post.tags.includes(tag))
		.map((post) => ({
			...post,
			featuredImage: images[post.featuredImage].default,
			featuredImageFallback: fallbacks[post.featuredImage].default,
		}));

	if (filteredPosts.length === 0) {
		throw error(404, 'Tag not found');
	}

	return {
		posts: filteredPosts,
		tag,
	};
};
