"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Gamepad,
  Film,
  LayoutGrid,
  Box,
  Star,
  BookOpen,
  ShoppingCart,
  User,
  Mail,
  Search,
} from "lucide-react";

export default function NavbarDropdown() {
  return (
    <nav className="flex justify-around items-center fixed top-0 left-0 right-0 bg-white shadow-md h-18 z-50">
      {/* Logo */}
      <Link href="/" className="mx-4">
        <Image src="/typo.png" alt="Logo" width={150} height={150} />
      </Link>

      {/* Menu principal */}
      <div className="flex gap-8 h-full">
        <Dropdown
          icon={<BookOpen className="w-4 h-4 mr-1" />}
          title="Animes"
          items={[
            { name: "Shonen", href: "/animes/shonen" },
            { name: "Isekai", href: "/animes/isekai" },
            { name: "Seinen", href: "/animes/seinen" },
            { name: "Mecha", href: "/animes/mecha" },
          ]}
        />
        <Dropdown
          icon={<Gamepad className="w-4 h-4 mr-1" />}
          title="Games"
          items={[
            { name: "Mario", href: "/games/mario" },
            { name: "Zelda", href: "/games/zelda" },
            { name: "Minecraft", href: "/games/minecraft" },
            { name: "FNaF", href: "/games/fnaf" },
          ]}
        />
        <Dropdown
          icon={<Film className="w-4 h-4 mr-1" />}
          title="Filmes"
          items={[
            { name: "Marvel", href: "/filmes/marvel" },
            { name: "Harry Potter", href: "/filmes/harrypotter" },
            { name: "Star Wars", href: "/filmes/starwars" },
          ]}
        />
        <Dropdown
          icon={<Star className="w-4 h-4 mr-1" />}
          title="Articulados"
          items={[
            { name: "Dragão articulado", href: "/articulados/dragao" },
            { name: "Robô articulado", href: "/articulados/robo" },
          ]}
        />
        <Dropdown
          icon={<LayoutGrid className="w-4 h-4 mr-1" />}
          title="Organizadores"
          items={[
            { name: "Mesa", href: "/organizadores/mesa" },
            { name: "Cabos", href: "/organizadores/cabos" },
            { name: "Gavetas", href: "/organizadores/gaveta" },
          ]}
        />
        <Link
          href="/personalizados"
          className="hover:text-sky-600 transition text-sm font-medium flex items-center"
        >
          {/* <Box className="w-4 h-4 mr-1" /> */}
          Personalizados
        </Link>
      </div>

      {/* Área lateral direita: busca + ícones */}
      <div className="flex items-center gap-4">
        {/* Campo de busca */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="border rounded-md pl-9 pr-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <Search className="absolute left-2.5 top-1.5 w-4 h-4 text-gray-500" />
        </div>

        {/* Ícones */}
        <Link href="/login" className="hover:text-blue-600 transition">
          <User className="w-5 h-5" />
        </Link>
        <Link href="/carrinho" className="hover:text-blue-600 transition">
          <ShoppingCart className="w-5 h-5" />
        </Link>
        <Link href="/contato" className="hover:text-blue-600 transition">
          <Mail className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
}

function Dropdown({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { name: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="text-sm font-medium hover:text-sky-600 transition px-1 py-2 flex items-center gap-1 cursor-pointer">
          {/* {icon} */}
          {title}
          {open ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="start"
        className="w-48 p-0 bg-white border rounded-md shadow-md cursor-pointer"
        sideOffset={0}
      >
        <motion.div
          initial={{ opacity: 0, y: -5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-1 p-2"
        >
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
