import { dirname } from 'path';

export interface Post {
	title: string;
	date: string;
	language: 'fr' | 'pt' | 'en' | 'es';
	featuredImage: string;
	featuredImageCaption: string;
	tags: string[];
	excerpt: string;
}

type GlobEntry = {
	metadata: Post;
	default: unknown;
};

const getExcerpt = (content: string, maxCharacters: number) => {
	let excerpt = content
		.replaceAll('\n', ' ')
		.replaceAll('*', '')
		.replaceAll('[', '')
		.replaceAll(']', '')
		.replace(/\^\d+/g, '')
		.replaceAll(' .', '.')
		.replaceAll('_', '')
		.replaceAll(/(?:\(https?):\/\/[\n\S]+/g, '');
	excerpt = excerpt.replace(/---.*?---/, '');
	excerpt = excerpt.trim();
	excerpt = excerpt.slice(0, maxCharacters);
	excerpt = excerpt.substring(0, excerpt.lastIndexOf(' '));

	if (excerpt.slice(-1) === '.') {
		excerpt = excerpt.slice(0, -1);
	}
	return excerpt;
};

const rawPosts = Object.entries(
	import.meta.glob<GlobEntry>('$src/posts/**/*.md', { as: 'raw', eager: true })
);

export const posts = Object.entries(
	import.meta.glob<GlobEntry>('$src/posts/**/*.md', { eager: true })
)
	.map(([filepath, globEntry], index) => {
		const dir = dirname(filepath);

		rawPosts[index].splice(0, 1);
		const excerpt = getExcerpt(rawPosts[index].join(''), 160);

		return {
			...globEntry.metadata,
			slug: dir.replace('/src/posts/', '').replace('/', '_'),
			filepath: filepath,
			featuredImage: `${dir}/${globEntry.metadata.featuredImage}`,
			excerpt
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	.map((post, index, allPosts) => ({
		...post,
		next: allPosts[index - 1] || 0,
		previous: allPosts[index + 1] || 0
	}));
