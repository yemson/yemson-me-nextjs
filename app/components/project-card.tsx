import Link from "next/link";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  type: "work" | "side" | "other";
}

export default function ProjectCard({
  id,
  title,
  description,
  type,
}: ProjectCardProps) {
  const typeLabel =
    type === "work" ? "회사 프로젝트" : type === "side" ? "개인 프로젝트" : "기타";
  const typeClassName =
    type === "side"
      ? "bg-green-50 text-green-800 dark:bg-green-900/40 dark:text-green-300"
      : "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300";

  return (
    <Link
      href={`/project/${id}`}
      className="block rounded-lg bg-neutral-50 p-4 transition-all hover:bg-neutral-100 dark:bg-neutral-800/40 dark:hover:bg-neutral-800/70"
    >
      <h3 className="font-medium text-neutral-700 dark:text-neutral-200">
        {title}
      </h3>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
      <span
        className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${typeClassName}`}
      >
        {typeLabel}
      </span>
    </Link>
  );
}
