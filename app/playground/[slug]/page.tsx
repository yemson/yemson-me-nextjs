import BackButton from "@/app/components/back-button";
import fs from "fs";
import path from "path";

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/playground");
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata } = await import(`@/content/playground/${slug}.mdx`);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post, metadata } = await import(
    `@/content/playground/${slug}.mdx`
  );
  return (
    <>
      <BackButton />
      <div className="slide-enter-content prose prose-neutral dark:prose-invert max-w-none pb-12">
        <div className="not-prose my-12">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            {metadata.date}
          </p>
          <h1 className="text-3xl text-center font-bold mb-1">
            {metadata.title}
          </h1>
          <p className="text-center text-neutral-500 dark:text-neutral-400">
            {metadata.description}
          </p>
        </div>
        <Post />
      </div>
    </>
  );
}
