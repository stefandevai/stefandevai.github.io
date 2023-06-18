import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	const component = await import(/* @vite-ignore */data.post.filepath);

	return {
		post: data.post,
		component: component.default,
	};
};
