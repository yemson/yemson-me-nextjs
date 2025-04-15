import About, { metadata } from "@/content/about.mdx";

export async function generateMetadata() {
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function Home() {
  return (
    <div className="slide-enter-content prose prose-neutral dark:prose-invert max-w-none pb-12">
      <About />
    </div>
  );
}
