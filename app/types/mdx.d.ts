declare module "*.mdx" {
  export const metadata: {
    title: string;
    description?: string;
    date?: string;
    type?: "work" | "side" | "other";
    order?: number;
    link?: string;
    github?: string;
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  const MDXComponent: (props: any) => JSX.Element; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default MDXComponent;
}
