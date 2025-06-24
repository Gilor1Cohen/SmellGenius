import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { User, UserContextType } from "../types/Auth.types";

export const UserContext = createContext<UserContextType>({
  auth: false,
  setAuth: () => {},
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
