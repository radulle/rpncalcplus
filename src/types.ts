type Color = "red" | "yellow" | "green" | "teal" | "orange" | "navy";

export interface KeyInterface {
  color?: Color;
  title: string | React.ReactElement;
  kbd: string;
  className?: string;
  onClick: () => void;
  main?: boolean;
  secondary?: boolean;
  modifier?: boolean;
  inverse?: boolean;
}

export type NoteProps = {
  action: string;
  onAction?: () => void;
  expire?: number;
};
