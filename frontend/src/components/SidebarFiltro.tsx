"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useFiltro } from "@/context/FiltroContext";

export default function SidebarFiltro({
  subcategorias,
}: {
  subcategorias: string[];
}) {
  const { filtroSubcategoria, setFiltroSubcategoria } = useFiltro();

  return (
    <Card className="w-64 sticky top-4 h-[calc(100vh-1rem)] bg-white flex flex-col">
      <CardHeader>
        <CardTitle className="mt-5 text-center">
          Filtrar por Subcategoria
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-2">
          <div className="flex flex-col gap-2">
            <Button
              variant={filtroSubcategoria === "" ? "default" : "ghost"}
              onClick={() => setFiltroSubcategoria("")}
              className="w-full text-left hover:cursor-pointer"
            >
              Todas
            </Button>
            {subcategorias.map((subcat) => (
              <Button
                key={subcat}
                variant={filtroSubcategoria === subcat ? "default" : "ghost"}
                onClick={() => setFiltroSubcategoria(subcat)}
                className="w-full text-left hover:cursor-pointer"
              >
                {subcat}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
