import { dirname } from 'path';

export interface Post {
	title: string;
	date: string;
	language: 'fr' | 'pt' | 'en' | 'es';
	featuredImage: string;
	featuredImageCaption: string;
	tags: string[];
}

type GlobEntry = {
	metadata: Post;
	default: unknown;
};

export const posts = Object.entries(
	import.meta.glob<GlobEntry>('$src/posts/**/*.md', { eager: true })
)
	.map(([filepath, globEntry]) => {
		const dir = dirname(filepath);

		return {
			...globEntry.metadata,
			slug: dir.replace('/src/posts/', '').replace('/', '_'),
			filepath: filepath,
			featuredImage: `${dir}/${globEntry.metadata.featuredImage}`
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	.map((post, index, allPosts) => ({
		...post,
		next: allPosts[index - 1] || 0,
		previous: allPosts[index + 1] || 0
	}));
