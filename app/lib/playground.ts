import { readdir } from "fs/promises";
import path from "path";

interface PlaygroundMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export async function getPlaygroundList(): Promise<PlaygroundMetadata[]> {
  const playgroundPath = path.resolve(process.cwd(), "content", "playground");

  const slugs = await readdir(playgroundPath, { withFileTypes: true });

  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`/content/playground/${name}`);

      const slug = name.replace(/\.mdx$/, "");
      return { slug, ...metadata };
    })
  );

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts;
}
