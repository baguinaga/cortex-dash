"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type SessionContextType = {
  token: string | null | undefined;
  login: (token: string) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken ?? null);
  }, []);

  function login(token: string) {
    setToken(token);
    localStorage.setItem("token", token);
  }
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <SessionContext.Provider value={{ token, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
