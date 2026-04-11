import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface ProjectLinksProps {
  link?: string;
  github?: string;
}

export default function ProjectLinks({ link, github }: ProjectLinksProps) {
  if (!link && !github) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {link ? (
        <Link
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <ExternalLink className="h-4 w-4" />
          <span>링크</span>
        </Link>
      ) : null}
      {github ? (
        <Link
          href={github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </Link>
      ) : null}
    </div>
  );
}
