import fs from "fs";
import path from "path";

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

export const dynamicParams = false;

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);
  return (
    <div className="slide-enter-content prose prose-neutral dark:prose-invert max-w-none">
      <Post />
    </div>
  );
}
