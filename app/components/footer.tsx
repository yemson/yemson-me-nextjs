export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-gray-400 backdrop-blur-2xl bg-white/30 dark:bg-neutral-900/30 border-t border-neutral-200 dark:border-neutral-800 z-10 w-full">
      <div className="max-w-2xl mx-auto px-4">
        <p>© {new Date().getFullYear()} Yemson. All rights reserved.</p>
      </div>
    </footer>
  );
}
