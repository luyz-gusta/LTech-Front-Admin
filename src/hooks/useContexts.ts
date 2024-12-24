import { useContext } from "react";
import { GlobalContext, GlobalContextType } from "../contexts/GlobalContext";

export function useContexts(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
