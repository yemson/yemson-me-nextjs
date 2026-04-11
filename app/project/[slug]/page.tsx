import BackButton from "@/app/components/back-button";
import ProjectLinks from "@/app/components/project-links";
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata } = await import(`@/content/project/${slug}.mdx`);
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
  const { default: Post, metadata } = await import(`@/content/project/${slug}.mdx`);
  return (
    <>
      <div className="slide-enter-content prose prose-neutral dark:prose-invert max-w-none pb-12 pt-1">
        <div className="not-prose mb-10 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {metadata.type === "work"
                ? "회사 프로젝트"
                : metadata.type === "side"
                  ? "개인 프로젝트"
                  : "기타"}
            </p>
            <BackButton className="shrink-0" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {metadata.title}
          </h1>
          {metadata.description ? (
            <p className="max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
              {metadata.description}
            </p>
          ) : null}
          <ProjectLinks link={metadata.link} github={metadata.github} />
        </div>
        <Post />
      </div>
    </>
  );
}
