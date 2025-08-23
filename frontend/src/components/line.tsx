// components/ComponenteLinhaDecorativa.js
import React from "react";
import { FaPix } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaDiamond } from "react-icons/fa6";

export default function Line() {
  return (
    <div className="flex justify-center items-center my-8 w-full select-none bg-gray-50">
      <div className="flex flex-row items-center justify-evenly w-full">
        <div className="flex  gap-2">
          <FaTruck className="text-3xl " />
          <span className="ml-2 text-lg">
            Entregamos em <span className="font-bold">todo o Brasil</span>
          </span>
        </div>

        <FaDiamond className="text-xs text-gray-400" />
        <div className="flex gap-2">
          <AiFillThunderbolt className="text-3xl" />
          <span className="ml-2 text-lg">
            Satisfação em <span className="font-bold">tempo recorde!</span>
          </span>
        </div>
        <FaDiamond className="text-xs text-gray-400" />
        <div className="flex  gap-2">
          <FaShield className="text-3xl" />
          <span className="ml-2 text-lg">
            Loja segura <span className="font-bold">100% protegida</span>
          </span>
        </div>
        <FaDiamond className="text-xs text-gray-400" />

        <div className="flex  gap-2">
          <FaPix className="text-3xl" />
          <span className="ml-2 text-lg">
            Aceitamos pagamentos <span className="font-bold">via PIX</span>
          </span>
        </div>
      </div>
    </div>
  );
}
