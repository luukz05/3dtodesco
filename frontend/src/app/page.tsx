// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import BackgroundCarousel from "@/components/BackgroundCarousel";

export default function Home() {
  return (
    <main className="bg-logobg text-gray-900 min-h-screen top-0 ">
      <header className="text-center flex justify-evenly items-center p-3 fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        {/* LOGO */}
        <Link href="/">
          <Image
            src="/typo.png"
            alt="Logo da empresa"
            width={115}
            height={115}
          />
        </Link>

        {/* SLOGAN / TÍTULO */}
        <section className="flex gap-10 font-semibold">
          <Link href="#sobre">Sobre</Link>
          <Link href="#servicos">Serviços</Link>
          <Link href="#diferenciais">Diferenciais</Link>
          <Link href="/teste">Portfolio</Link>
        </section>

        <section className="bg-blue-600 p-1 pl-5 pr-5 rounded-lg h-full">
          <Link href="/teste" className="text-white font-semibold">
            Loja
          </Link>
        </section>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-[95vh] flex items-center justify-center text-white overflow-hidden">
        <BackgroundCarousel />
      </section>

      <section id="sobre" className="bg-gray-100 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Quem somos
            </h2>
            <p className="text-gray-600">
              Somos uma empresa especializada em soluções de impressão 3D,
              atuando com projetos personalizados para empresas, engenheiros,
              designers e entusiastas. Nosso compromisso é unir criatividade,
              precisão técnica e confiabilidade para atender às necessidades de
              nossos clientes.
            </p>
          </div>
          <div className="h-64 rounded-lg  flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Imagem representativa da empresa"
              width={300}
              height={300}
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Nossos Serviços
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              "Protótipos Rápidos",
              "Peças Técnicas",
              "Design Personalizado",
            ].map((titulo, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="h-40 bg-gray-300 mb-4 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">Imagem {idx + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {titulo}
                </h3>
                <p className="text-gray-600 text-sm">
                  Descrição breve do serviço prestado. Pode incluir tipos de
                  materiais, precisão, prazo médio, etc.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 px-6 bg-blue-50" id="diferenciais">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Nossos diferenciais
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-left">
            {[
              {
                title: "Alta Precisão",
                desc: "Equipamentos de última geração com tolerâncias mínimas.",
              },
              {
                title: "Atendimento Personalizado",
                desc: "Acompanhamos seu projeto do início ao fim.",
              },
              {
                title: "Agilidade e Comprometimento",
                desc: "Entregas dentro do prazo e com qualidade.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg text-gray-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para tirar sua ideia do papel?
        </h2>
        <p className="text-lg mb-8">
          Entre em contato conosco e comece seu projeto hoje mesmo!
        </p>
        <a
          href="#"
          className="inline-block bg-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Fale Conosco
        </a>
      </section>
    </main>
  );
}
