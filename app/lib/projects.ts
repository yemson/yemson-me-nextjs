import { readdir } from "fs/promises";
import path from "path";

interface ProjectMetadata {
  slug: string;
  title: string;
  description: string;
  type: "work" | "side" | "other";
  order: number;
  link?: string;
  github?: string;
}

export async function getProjects(): Promise<ProjectMetadata[]> {
  const projectPath = path.resolve(process.cwd(), "content", "project");

  const slugs = await readdir(projectPath, { withFileTypes: true });

  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`/content/project/${name}`);

      const slug = name.replace(/\.mdx$/, "");
      return { slug, ...metadata };
    })
  );

  posts.sort((a, b) => a.order - b.order);

  return posts;
}
