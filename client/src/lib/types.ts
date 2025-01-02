export interface Pin {
  pinId: { _id: string; imageUrl: string; createdBy?: string };
  _id: string;
  title?: string;
  imageUrl: string;
  createdAt: string;
  createdBy?: string;
  description?: string;
}

export interface Comment {
  _id: string;
  text: string;
  createdBy: string;
  createdAt: string;
}

export interface ButtonProps {
  className: string;
  children?: React.ReactNode;
  icon?: React.ElementType;
  onClick?: () => void;
  title?: string;
}

export interface Board {
  _id: string;
  name: string;
  data?: string[];
  description?: string;
  createdBy?: string;
  pins?: Pin[];
}
