export type PageProps = {
  title: string;
  children: React.ReactNode;
  goBackHome?: boolean;
  showHelpIcon?: boolean;
  height?: number | "auto";
  goBackScreen?: boolean;
  straight?: boolean;
  backFunction?: () => void;
};
