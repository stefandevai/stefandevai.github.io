import type { PageLoad } from './$types';

const posts = import.meta.glob('$src/posts/**/*.md', { eager: true });

const images = import.meta.glob('$src/posts/**/*.{png,jpg,jpeg,webp}', {
	eager: true,
	query: {
		w: 868,
		h: 550,
		position: 'attention',
		format: 'webp',
		grayscale: true,
		flatten: true,
		quality: 50,
	},
});

export const load: PageLoad = async ({ data }) => {
	const component = posts[data.post.filepath];
	const image = images[data.post.featuredImage];

	return {
		post: {
			...data.post,
			featuredImage: image.default,
		},
		component: component.default,
	};
};
