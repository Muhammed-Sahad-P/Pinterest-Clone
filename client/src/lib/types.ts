export interface Pin {
  pinId: { _id: string; imageUrl: string; createdBy?: string };
  _id: string;
  title?: string;
  imageUrl: string;
  createdAt: string;
  createdBy?: {
    _id: string;
    username: string;
    email: string;
  };
  description?: string;
  likeCount?: number;
  saveCount?: number;
}

export interface Comment {
  createdAt: string;
  commentId: string;
  _id: string;
  text: string;
  pinId: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
  };
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
