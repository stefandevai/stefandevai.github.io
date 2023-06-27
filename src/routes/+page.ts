import type { PageLoad } from './$types';

const images = import.meta.glob('$src/posts/**/*.{png,jpg,jpeg,webp}', {
	eager: true,
	query: { w: 250, h: 250, format: 'webp' }
});
// ?w=250&h=250&format=webp

export const load: PageLoad = async ({ data }) => {
	const newPosts = data.posts.map((post) => ({
		...post,
		featuredImage: `${images[post.featuredImage].default}`
	}));

	return {
		posts: newPosts
	};
};
