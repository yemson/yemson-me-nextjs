import ProjectCard from "./project-card";
import { getProjects } from "../lib/projects";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <>
      <p className="mb-3 text-neutral-600 dark:text-neutral-300">프로젝트</p>
      <div className="not-prose">
        <div className="grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 w-full">
          {projects.map((project) => (
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
    </>
  );
}
