import About from "@/content/about.mdx";

export async function generateMetadata() {
  const { metadata } = await import(`@/content/about.mdx`);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function Home() {
  return (
    <div className="slide-enter-content prose prose-neutral dark:prose-invert max-w-none pb-12 pt-6">
      <About />
    </div>
  );
}
