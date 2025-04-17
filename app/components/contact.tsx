import { Github, Mail } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Link
        target="_blank"
        href="https://github.com/yemson"
        className="no-underline inline-flex items-center gap-1 rounded py-1 px-1.5 text-sm font-medium hover:opacity-75 transition-opacity duration-100 bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-gray-100"
      >
        <Github className="h-4 w-4" />
        <span>깃허브</span>
      </Link>
      <Link
        href="mailto:yemson@icloud.com"
        className="no-underline inline-flex items-center gap-1 rounded py-1 px-1.5 text-sm font-medium hover:opacity-75 transition-opacity duration-100 bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-gray-100"
      >
        <Mail className="h-4 w-4" />
        <span>이메일</span>
      </Link>
    </div>
  );
}
