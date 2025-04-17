import Link from "next/link";
import { getBlogList } from "../lib/blog";

export default async function Page() {
  const posts = await getBlogList();

  return (
    <div className="slide-enter-content prose prose-neutral dark:prose-invert max-w-none pb-12 pt-6">
      <h1>글</h1>

      {posts.map((post) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.slug}
          className="not-prose flex justify-between flex-wrap mb-4 !opacity-90 hover:!opacity-100 transition-all duration-200 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/40 dark:hover:bg-neutral-800/70 hover:shadow-sm"
        >
          <div>
            <h1 className="text-xl font-bold">{post.title}</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              {post.description}
            </p>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            {post.date}
          </p>
        </Link>
      ))}
    </div>
  );
}
