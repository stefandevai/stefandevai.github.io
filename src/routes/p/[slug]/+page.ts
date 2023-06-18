import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, params }) => {
	// TODO: Don't load all posts or images everytime
	const posts = await import.meta.glob<GlobEntry>('$src/posts/**/*.md', { eager: true });
	const images = await import.meta.glob<GlobEntry>('$src/posts/**/*.{png,jpg,jpeg,webp}', { eager: true });

	const component = posts[data.post.filepath];
	// const image = images.find((item) => item[0].includes(data.post.featuredImage));
	const image = images[data.post.featuredImage];

	return {
		post: {
			...data.post,
			featuredImage: image.default,
		},
		component: component.default
	};
};
