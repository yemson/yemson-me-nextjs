import Link from "next/link";
import ProjectCard from "./project-card";
import { getProjects } from "../lib/projects";

interface ProjectsProps {
  showHeading?: boolean;
  limit?: number;
  showMoreLink?: boolean;
}

export default async function Projects({
  showHeading = true,
  limit,
  showMoreLink = false,
}: ProjectsProps) {
  const projects = await getProjects();
  const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <div className="not-prose">
      {showHeading ? (
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-neutral-600 dark:text-neutral-300">프로젝트</p>
          {showMoreLink ? (
            <Link
              href="/project"
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              더보기
            </Link>
          ) : null}
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 w-full">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            id={project.slug}
            title={project.title}
            description={project.description || ""}
            type={project.type || "other"}
          />
        ))}
      </div>
    </div>
  );
}
