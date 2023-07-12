import type { GlobEntry } from '$lib/server/posts';

export const postListImages = import.meta.glob<GlobEntry>('$src/posts/**/*.{png,jpg,jpeg,webp}', {
	eager: true,
	query: {
		w: '250;100',
		format: 'avif;webp;jpg',
		grayscale: true,
		flatten: true,
		quality: 40,
		as: 'picture',
	},
});

export const postPageImages = import.meta.glob<GlobEntry>('$src/posts/**/*.{png,jpg,jpeg,webp}', {
	eager: true,
	query: {
		w: '868;736;382',
		position: 'attention',
		format: 'avif;webp;jpg',
		grayscale: true,
		flatten: true,
		quality: 50,
		as: 'picture',
	},
});

export const postImagesFallbacks = import.meta.glob<GlobEntry>(
	'$src/posts/**/*.{png,jpg,jpeg,webp}',
	{
		eager: true,
		query: { w: 10, h: 10, format: 'jpg', grayscale: true, flatten: true, quality: 20 },
	}
);
