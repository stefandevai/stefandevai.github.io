import { dirname } from 'path';
import { postsComponents } from '$lib/helpers/posts';
import { dev } from '$app/environment';

export interface Post {
	title: string;
	date: string;
	language: 'fr' | 'pt' | 'en' | 'es';
	featuredImage: string;
	featuredImageCaption: string;
	tags: string[];
	excerpt: string;
	published: boolean;
}

export type GlobEntry = {
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
		.replaceAll(/(?:\(https?):\/\/[\n\S]+/g, '')
		.replaceAll(/<script.*?<\/script>/g, '')
		.replace(/---.*?---/, '')
		.trim()
		.slice(0, maxCharacters);

	excerpt = excerpt.substring(0, excerpt.lastIndexOf(' '));

	if (excerpt.slice(-1) === '.') {
		excerpt = excerpt.slice(0, -1);
	}
	return excerpt;
};

const rawPosts = Object.entries(
	import.meta.glob<GlobEntry>('$src/posts/**/*.md', { as: 'raw', eager: true })
);

export const posts = Object.entries(postsComponents)
	.filter((component) => {
		return dev ? true : component[1].metadata.published;
	})
	.map(([filepath, globEntry], index) => {
		const dir = dirname(filepath);

		rawPosts[index].splice(0, 1);
		const excerpt = getExcerpt(rawPosts[index].join(''), 160);

		const date = new Date(globEntry.metadata.date);
		const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
		const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
		const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
		const readableSlugPart = dir.replace('/src/posts/', '').replace(/\d+\//, '');
		const slug = `${readableSlugPart}-${date.getTime() / 100000}`;

		return {
			...globEntry.metadata,
			date: `${day}-${month}-${year}`,
			slug,
			filepath: filepath,
			featuredImage: `${dir}/${globEntry.metadata.featuredImage}`,
			excerpt,
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	.map((post, index, allPosts) => ({
		...post,
		next: allPosts[index + 1] ?? allPosts[0],
		previous: allPosts[index - 1] ?? allPosts[allPosts.length - 1],
	}));
