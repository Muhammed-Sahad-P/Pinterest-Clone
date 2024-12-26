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
