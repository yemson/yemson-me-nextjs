import Link from "next/link";
import ProjectCard from "./project-card";
import { getProjects } from "../lib/projects";

interface ProjectsProps {
  showHeading?: boolean;
  limit?: number;
  showMoreLink?: boolean;
  splitByType?: boolean;
}

export default async function Projects({
  showHeading = true,
  limit,
  showMoreLink = false,
  splitByType = false,
}: ProjectsProps) {
  const projects = await getProjects();
  const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;
  const workProjects = visibleProjects.filter((project) => project.type === "work");
  const sideProjects = visibleProjects.filter((project) => project.type === "side");
  const otherProjects = visibleProjects.filter(
    (project) => project.type !== "work" && project.type !== "side"
  );

  const renderGrid = (items: typeof visibleProjects) => (
    <div className="grid w-full grid-cols-1 gap-4 min-[430px]:grid-cols-2">
      {items.map((project) => (
        <ProjectCard
          key={project.slug}
          id={project.slug}
          title={project.title}
          description={project.description || ""}
          type={project.type || "other"}
        />
      ))}
    </div>
  );

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
      {splitByType ? (
        <div className="space-y-10">
          {workProjects.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                회사 프로젝트
              </h2>
              {renderGrid(workProjects)}
            </section>
          ) : null}
          {sideProjects.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                개인 프로젝트
              </h2>
              {renderGrid(sideProjects)}
            </section>
          ) : null}
          {otherProjects.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                기타
              </h2>
              {renderGrid(otherProjects)}
            </section>
          ) : null}
        </div>
      ) : (
        renderGrid(visibleProjects)
      )}
    </div>
  );
}
