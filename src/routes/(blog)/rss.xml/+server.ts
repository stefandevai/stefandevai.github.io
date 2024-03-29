import { title as siteTitle, description as siteDescription, baseUrl } from '$lib/config';
import { postUrlSection } from '$lib/config';
import { posts } from '$lib/server/posts';

export const prerender = true;

export const GET = () => {
	const headers = {
		'Cache-Control': `max-age=0, s-max-age=3600`,
		'Content-Type': 'application/xml',
	};
	const body = render();

	return new Response(body, { headers });
};

const render = () => {
	const postsXML = posts
		.map(
			({ slug, title, date, excerpt }) => `
			<item>
				<title>${title}</title>
				<link>${baseUrl}/${postUrlSection}/${slug}</link>
				<pubDate>${new Date(date).toUTCString()}</pubDate>
				<description>${excerpt}…</description>
			</item>
		`
		)
		.join('');

	return `
		<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${siteTitle}</title>
				<link>${baseUrl}</link>
				<description>${siteDescription}</description>
				<language>en</language>
				<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
				${postsXML}
			</channel>
		</rss>
	`;
};
