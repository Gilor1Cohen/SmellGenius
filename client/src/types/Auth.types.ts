export interface User {
  _id: string;
  Name: string;
  YearOfBirth: number | string;
  FavoritePerfumes: number;
  Gender: string;
  Email: string;
}

export interface UserContextType {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface AuthData {
  Email: string;
  Password: string;
  Name?: string;
  YearOfBirth?: number;
  Gender?: "Male" | "Female" | "Other";
}

export interface Auth {
  token: string;
  data: User;
}

export interface AuthRes {
  data: Auth;
}

export interface TokenRes {
  user: {
    _id: string;
    Name: string;
    YearOfBirth: number;
    FavoritePerfumes: number;
    Gender: string;
    Email: string;
    iat: number;
    exp: number;
  };
}

export interface UserEdit {
  Name: string;
  Email: string;
  YearOfBirth: string | number;
  Gender: string;
}

export interface editPasswordForm {
  Password: string;
  PasswordAgain: string;
}


export interface editPasswordRes {
  data: {
    message: string;
  };
}
