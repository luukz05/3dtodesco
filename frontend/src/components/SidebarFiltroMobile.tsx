"use client";

import { useState } from "react";
import SidebarFiltro from "./SidebarFiltro";

export default function SidebarFiltroMobile({
  subcategorias,
}: {
  subcategorias: string[];
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300); // tempo igual ao da animação
  };

  return (
    <>
      {/* Botão abrir filtro */}
      <div className="md:hidden flex justify-center mb-6">
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm font-medium"
          onClick={() => setOpen(true)}
        >
          Filtrar produtos
        </button>
      </div>

      {/* Overlay + Sidebar mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose}>
          <div
            className={`absolute top-0 left-0 w-72 h-full bg-white shadow-lg p-4 overflow-y-auto 
              ${closing ? "animate-slide-out" : "animate-slide-in"}`}
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
          >
            <button
              className="mt-4 px-4 py-2 w-full rounded-lg bg-gray-200 text-gray-800 text-sm font-medium"
              onClick={handleClose}
            >
              Fechar
            </button>
            <SidebarFiltro subcategorias={subcategorias} />
          </div>
        </div>
      )}
    </>
  );
}
