import Line from "@/components/line";
import SidebarFiltro from "@/components/SidebarFiltro";
import ListaProdutos from "@/components/ListaProdutos";
import { FiltroProvider } from "@/context/FiltroContext";
import SidebarFiltroMobile from "@/components/SidebarFiltroMobile";

type ImagemProduto = { url: string; origem: string };
type Produto = {
  _id: string;
  descricao: string;
  nome: string;
  preco: number;
  imagens: ImagemProduto[];
  subcategoria?: string;
};

type Params = Promise<{ categoria: string }>;

async function getProdutos(categoria: string): Promise<Produto[]> {
  const res = await fetch(
    `https://threedtodesco.onrender.com/api/produtos/categoria/${categoria}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function ProdutosPorCategoria({
  params,
}: {
  params: Params;
}) {
  const { categoria } = await params;
  const produtos = await getProdutos(categoria);

  const subcategorias: string[] = Array.from(
    new Set(produtos.map((p) => p.subcategoria).filter((s): s is string => !!s))
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <FiltroProvider>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar fixa no desktop */}
          <aside className="hidden md:block w-64 shrink-0">
            <SidebarFiltro subcategorias={subcategorias} />
          </aside>

          {/* Conteúdo principal */}
          <section className="flex-1 px-4 md:px-0">
            <div className="scale-75">
              <Line />
            </div>
            <h1 className="text-3xl md:text-4xl font-medium text-center mb-6 mt-2">
              {categoria === "filmes-e-series"
                ? "Filmes e Séries"
                : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </h1>

            {/* Botão + Sidebar no mobile */}
            <SidebarFiltroMobile subcategorias={subcategorias} />

            <ListaProdutos produtos={produtos} />
          </section>
        </div>
      </FiltroProvider>
    </main>
  );
}
