import ItemCard from "@/components/ItemCard";
import Line from "@/components/line";

type ImagemProduto = {
  url: string;
  origem: string;
};

type Produto = {
  _id: string;
  descricao: string;
  nome: string;
  preco: number;
  altura?: number;
  largura?: number;
  profundidade?: number;
  peso?: number;
  material?: string;
  origem?: string;
  imagens: ImagemProduto[];
};

export default async function ProdutosPorCategoria({
  params,
}: {
  params: { categoria: string };
}) {
  const { categoria } = params;

  const res = await fetch(
    `http://localhost:5000/api/produtos/categoria/${categoria}`,
    { cache: "no-store" } // força pegar sempre atualizado
  );

  const produtos: Produto[] = res.ok ? await res.json() : [];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Line />
      <section>
        <h1 className="text-4xl font-medium text-center mb-10 mt-10">
          {categoria === "filmes-e-series"
            ? "Filmes e Séries"
            : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </h1>
        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <ItemCard
                key={produto._id}
                id={produto._id}
                imagem={produto?.imagens?.[0]?.url} // <- aqui pegamos a URL da primeira imagem
                preco={produto.preco}
                nome={produto.nome}
              />
            ))
          ) : (
            <p className="text-center col-span-4 font-bold text-black/20">
              Nenhum produto encontrado nesta categoria.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
