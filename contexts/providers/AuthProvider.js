"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  //...

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
