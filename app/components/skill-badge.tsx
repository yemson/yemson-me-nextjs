import Image from "next/image";

interface SkillBadgeProps {
  skill: string;
  src?: string;
}

export default function SkillBadge({ skill, src }: SkillBadgeProps) {
  return (
    <span className="inline-flex h-5 items-center gap-1 rounded px-1.5 text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-gray-100">
      <Image
        width={12}
        height={12}
        className="inline-block"
        src={`/skill-icons/${src}`}
        alt={skill + " icon"}
      />
      <span>{skill}</span>
    </span>
  );
}
