type Color = "red" | "yellow" | "green" | "teal" | "orange" | "navy" | "blue";

export interface KeyInterface {
  title: string | React.ReactElement;
  kbd: string;
  onClick: () => void;
  color?: Color;
  className?: string;
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
