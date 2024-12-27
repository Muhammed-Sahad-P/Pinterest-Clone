export interface Pin {
  _id: string;
  imageUrl: string;
}

export interface ButtonProps {
  className: string;
  children?: React.ReactNode;
  icon?: React.ElementType;
  onClick?: () => void;
}

export interface Board {
  _id: string;
  name: string;
  data?: string[];
}
