// components/ComponenteLinhaDecorativa.js
import React from "react";
import { FaPix } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaDiamond } from "react-icons/fa6";

export default function Line() {
  return (
    <div className="flex justify-center items-center py-6 w-full select-none bg-gray-50">
      <div className="flex flex-col sm:flex-row items-center justify-evenly w-full gap-6 sm:gap-4 px-4">
        {/* Item 1 */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <FaTruck className="text-2xl sm:text-3xl" />
          <span className="text-base sm:text-lg">
            Entregamos em <span className="font-bold">todo o Brasil</span>
          </span>
        </div>

        {/* Separador */}
        <FaDiamond className="hidden sm:block text-xs text-gray-400" />

        {/* Item 2 */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <AiFillThunderbolt className="text-2xl sm:text-3xl" />
          <span className="text-base sm:text-lg">
            Satisfação em <span className="font-bold">tempo recorde!</span>
          </span>
        </div>

        <FaDiamond className="hidden sm:block text-xs text-gray-400" />

        {/* Item 3 */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <FaShield className="text-2xl sm:text-3xl" />
          <span className="text-base sm:text-lg">
            Loja segura <span className="font-bold">100% protegida</span>
          </span>
        </div>

        <FaDiamond className="hidden sm:block text-xs text-gray-400" />

        {/* Item 4 */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <FaPix className="text-2xl sm:text-3xl" />
          <span className="text-base sm:text-lg">
            Aceitamos pagamentos <span className="font-bold">via PIX</span>
          </span>
        </div>
      </div>
    </div>
  );
}
