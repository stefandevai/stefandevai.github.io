import { error } from '@sveltejs/kit';
import { posts } from '$lib/server/posts';
import { postPageImages as images, postImagesFallbacks as fallbacks } from '$lib/server/images';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const image = images[post.featuredImage].default;
	const fallback = fallbacks[post.featuredImage].default;

	return {
		post: {
			...post,
			featuredImage: image,
			featuredImageFallback: fallback,
		},
	};
};
