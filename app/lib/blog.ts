import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "content", "blog");

export type BlogMetadata = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  image?: string;
};

export function getBlogList(): BlogMetadata[] {
  const files = fs.readdirSync(POSTS_PATH);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(POSTS_PATH, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title || "제목 없음",
        date: data.date || "",
        description: data.description || "",
        image: data.image || "",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date)); // 최신 순 정렬
}
