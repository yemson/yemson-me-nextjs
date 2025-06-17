import Link from "next/link";
import { getPlaygroundList } from "../lib/playground";

export default async function Page() {
  const posts = await getPlaygroundList();

  return (
    <div className="slide-enter-content prose prose-neutral dark:prose-invert max-w-none pb-12 pt-6">
      <h1>놀이터</h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            href={`/playground/${post.slug}`}
            key={post.slug}
            className="not-prose flex justify-between flex-wrap mb-4 !opacity-90 hover:!opacity-100 transition-all duration-200 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/40 dark:hover:bg-neutral-800/70"
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
    </div>
  );
}
