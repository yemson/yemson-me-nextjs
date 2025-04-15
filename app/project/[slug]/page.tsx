import BackButton from "@/app/components/back-button";
import fs from "fs";
import path from "path";

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/project");
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
  params: { slug: string };
}) {
  const { slug } = await params;
  const { metadata } = await import(`@/content/project/${slug}.mdx`);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export const dynamicParams = false;

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/project/${slug}.mdx`);
  return (
    <>
      <BackButton />
      <div className="slide-enter-content prose prose-neutral dark:prose-invert max-w-none pb-12 pt-1">
        <Post />
      </div>
    </>
  );
}
