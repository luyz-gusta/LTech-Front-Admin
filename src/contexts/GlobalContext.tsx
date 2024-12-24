import { createContext, ReactNode, useEffect, useState } from "react";
import User from "../utils/types/user";

interface GlobalProviderProps {
  children: ReactNode;
}
export interface GlobalContextType {
  user: User | null;
  setUser: (user: User | null) => void;

  width: number;
  setWidth: (width: number) => void;

  isActiveLoading: boolean;
  setIsActiveLoading: (isActiveLoading: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isActiveLoading, setIsActiveLoading] = useState<boolean>(false);


  useEffect(() => {
    const storedData = localStorage.getItem("userStorage");

    if(storedData != undefined){
      sessionStorage.setItem("userStorage", JSON.stringify(storedData))
      setUser(JSON.parse(storedData))
    }else{
      const storedUser = sessionStorage.getItem("userStorage");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, width, setWidth, isActiveLoading, setIsActiveLoading }}>
      {children}
    </GlobalContext.Provider>
  );
}