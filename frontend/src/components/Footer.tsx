// Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { TbShoppingCart } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-20 md:pb-10 mt-auto relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
          {/* Logo & Descrição */}
          <div className="text-center md:text-left md:w-1/3">
            <h2 className="text-2xl font-bold mb-3">3D Todesco</h2>
            <p className="text-gray-400 text-sm text-justify md:text-left">
              Transformamos seu conceito em realidade com impressão 3D!
              Produzimos peças sob medida para protótipos, projetos acadêmicos,
              engenharia, design, brindes personalizados, e modelos abertos da
              internet! Trabalho com modelagem personalizada de acordo com as
              suas necessidades!
            </p>
          </div>

          {/* Institucional */}
          <div className="text-center md:text-left md:w-1/4">
            <h3 className="text-white font-semibold mb-2">Institucional</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>
                <a href="/politica-de-privacidade" className="hover:text-white">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contato & Redes Sociais */}
          <div className="text-center md:text-left md:w-1/3">
            <h3 className="text-white font-semibold mb-2">Contato</h3>
            <p className="text-gray-400 text-sm">
              R. Manoel José da Fonseca, 193 - Centro, Sorocaba - SP, 18035-070
            </p>
            <p className="text-gray-400 text-sm">
              Email: ti3dtodesco@gmail.com
            </p>
            <p className="text-gray-400 text-sm">Telefone: (15) 99195-0200</p>

            <div className="flex justify-center md:justify-start mt-4 space-x-6 text-lg">
              <a
                href="https://www.facebook.com/3d.todesco"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/3dtodesco/?hl=pt-br"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTiktok />
              </a>
              <a
                href="https://share.google/5m7YENc34h4yPCBiz"
                className="text-gray-400 hover:text-white"
              >
                <SiGooglemaps />
              </a>
            </div>
          </div>
        </div>

        {/* Desenvolvido por */}
        <div className="mt-10 text-center text-gray-400 text-xs sm:text-sm">
          Desenvolvido por{" "}
          <a
            href="https://luukz05.github.io/Portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Lucas Vargas
          </a>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 border-t border-gray-700 pt-4 text-center text-gray-400 text-xs sm:text-sm">
          GUSTAVO TODESCO MEIRA - CNPJ 61.435.154/0001-09 &copy;{" "}
          {new Date().getFullYear()} 3D Todesco. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
