export interface Pin {
  pinId: { imageUrl: string };
  _id: string;
  title?: string;
  imageUrl: string;
  createdAt: string;
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
