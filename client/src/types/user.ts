export interface User {
  userName: string;
  email: string;
  password: string;
  id: string;
  profilePicture: string;
  bio?: string;
  token: string;
}

export interface UserData extends User {
  password: string;
}

export interface loginUser {
  id: string;
  email: string;
  token: string;
}
