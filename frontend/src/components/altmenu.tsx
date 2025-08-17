"use client";

import * as React from "react";
import { MenuIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b">
      {/* Botão hamburger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 ">
          <SheetHeader>
            <SheetTitle>Categorias</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-6 pl-5">
            <a href="#" className="font-medium hover:underline">
              Utilidades Domésticas
            </a>
            <a href="#" className="font-medium hover:underline">
              Decoração & Arte
            </a>
            <a href="#" className="font-medium hover:underline">
              Peças Técnicas
            </a>
            <a href="#" className="font-medium hover:underline">
              Personalizados
            </a>
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo central */}
      <Link href={"/"} className="flex items-center self-center">
        <Image src="/typo.png" alt="Logo" width={130} height={100} priority />
      </Link>

      {/* Ícone de pesquisa */}
      <div className="flex items-center gap-4">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-4 w-3"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        </div>
        <Button variant="ghost" size="icon">
          <AiOutlineShoppingCart className="size-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="size-5" />
        </Button>
      </div>
    </div>
  );
}
