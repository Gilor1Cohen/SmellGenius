export interface User {
  _id: string;
  Name: string;
  YearOfBirth: number | string;
  FavoritePerfumes: number;
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

export interface AuthRes {
  token: string;
  data: User;
}

export interface TokenRes {
  user: {
    _id: string;
    Name: string;
    YearOfBirth: number;
    FavoritePerfumes: number;
    iat: number;
    exp: number;
  };
}
