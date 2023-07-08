import type { PageLoad } from './$types';

const images = import.meta.glob('$src/posts/**/*.{png,jpg,jpeg,webp}', {
	eager: true,
	query: {
		w: '636;350;250',
		format: 'webp;jpg',
		grayscale: true,
		flatten: true,
		quality: 70,
		as: 'picture',
	},
});

const fallbacks = import.meta.glob('$src/posts/**/*.{png,jpg,jpeg,webp}', {
	eager: true,
	query: { w: 10, h: 10, format: 'webp', grayscale: true, flatten: true, quality: 20 },
});

export const load: PageLoad = async ({ data }) => {
	const newPosts = data.posts.map((post) => ({
		...post,
		featuredImage: images[post.featuredImage].default,
		featuredImageFallback: fallbacks[post.featuredImage].default,
	}));

	return {
		posts: newPosts,
	};
};
