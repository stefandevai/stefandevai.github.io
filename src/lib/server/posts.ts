import { parse } from 'path';

export interface Post {
	title: string;
	description: string;
	date: string;
}

type GlobEntry = {
	metadata: Post;
	default: unknown;
};

export const posts = Object.entries(import.meta.glob<GlobEntry>('$src/posts/**/*.md', { eager: true }))
	.map(([filepath, globEntry]) => {
		return {
			...globEntry.metadata,
			slug: parse(filepath).name,
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	.map((post, index, allPosts) => ({
		...post,
		next: allPosts[index - 1] || 0,
		previous: allPosts[index + 1] || 0
	}));
