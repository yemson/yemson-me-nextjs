import { readdir } from "fs/promises";
import path from "path";

interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export async function getBlogList(): Promise<BlogMetadata[]> {
  const projectPath = path.resolve(process.cwd(), "content", "blog");

  const slugs = await readdir(projectPath, { withFileTypes: true });

  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`/content/blog/${name}`);

      const slug = name.replace(/\.mdx$/, "");
      return { slug, ...metadata };
    })
  );

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts;
}
