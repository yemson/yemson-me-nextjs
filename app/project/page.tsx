import Projects from "../components/projects";

export const metadata = {
  title: "프로젝트 - yemson",
  description: "이예민의 프로젝트 목록입니다.",
};

export default function ProjectPage() {
  return (
    <div className="slide-enter-content prose prose-neutral dark:prose-invert max-w-none pb-12 pt-6">
      <h1>프로젝트</h1>
      <Projects showHeading={false} />
    </div>
  );
}
