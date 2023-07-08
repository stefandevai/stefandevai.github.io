import { posts } from '$lib/server/posts';

export const prerender = true;

const pages = ['about'];
const homepage = 'https://stefandevai.com';

export const GET = () => {
	const headers = {
		'Cache-Control': `max-age=0, s-max-age=3600`,
		'Content-Type': 'application/xml',
	};
	const body = render();

	return new Response(body, { headers });
};

const render = () => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${homepage}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  ${pages
		.map(
			(page) => `
		<url>
			<loc>${homepage}/${page}</loc>
			<changefreq>yearly</changefreq>
			<priority>0.3</priority>
		</url>
		`
		)
		.join('')}

  ${posts
		.map(
			(post) => `
		<url>
			<loc>${homepage}/p/${post.slug}</loc>
			<changefreq>yearly</changefreq>
			<lastmod>${post.date}</lastmod>
			<priority>0.6</priority>
		</url>
		`
		)
		.join('')}
</urlset>`;
