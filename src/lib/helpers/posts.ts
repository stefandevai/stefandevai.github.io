import type { GlobEntry } from '$lib/server/posts';

export const postsComponents = import.meta.glob<GlobEntry>('$src/posts/**/*.md', { eager: true });
