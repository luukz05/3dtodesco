"use client";

import { createContext, useContext, useState } from "react";

type FiltroContextType = {
  filtroSubcategoria: string;
  setFiltroSubcategoria: (sub: string) => void;
};

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

export function FiltroProvider({ children }: { children: React.ReactNode }) {
  const [filtroSubcategoria, setFiltroSubcategoria] = useState("");

  return (
    <FiltroContext.Provider
      value={{ filtroSubcategoria, setFiltroSubcategoria }}
    >
      {children}
    </FiltroContext.Provider>
  );
}

export function useFiltro() {
  const context = useContext(FiltroContext);
  if (!context) {
    throw new Error("useFiltro deve ser usado dentro de FiltroProvider");
  }
  return context;
}
