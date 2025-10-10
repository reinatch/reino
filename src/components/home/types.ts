export type ProjectPreview = { titulo?: string; preview?: string | string[] };

export type HomeExampleProps = {
  projects: ProjectPreview[];
  activeIndex: number | null;
  onSelect: (i: number) => void;
};
