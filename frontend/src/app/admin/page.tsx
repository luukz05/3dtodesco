"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
  destaque: boolean;
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<string | null>(null);
  const [formEdicao, setFormEdicao] = useState<Partial<Produto>>({});
  const [novasImagens, setNovasImagens] = useState<File[]>([]);

  // Buscar produtos
  const fetchProdutos = async () => {
    try {
      const res = await fetch(
        "https://threedtodesco.onrender.com/api/produtos"
      );
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Alterar form de edição (corrigido para TypeScript)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.currentTarget;

    setFormEdicao((prev) => ({
      ...prev,
      [target.name]:
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value,
    }));
  };

  // Upload de imagens
  const handleUploadImagens = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNovasImagens(Array.from(e.target.files));
    }
  };

  // Reordenar imagens
  const moverImagem = (index: number, direcao: "up" | "down") => {
    if (!formEdicao.imagens) return;
    const novaOrdem = [...formEdicao.imagens];
    const novoIndex = direcao === "up" ? index - 1 : index + 1;

    if (novoIndex < 0 || novoIndex >= novaOrdem.length) return;

    [novaOrdem[index], novaOrdem[novoIndex]] = [
      novaOrdem[novoIndex],
      novaOrdem[index],
    ];
    setFormEdicao((prev) => ({ ...prev, imagens: novaOrdem }));
  };

  // Editar produto
  const salvarEdicao = async (id: string) => {
    try {
      const formData = new FormData();

      Object.entries(formEdicao).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "imagens" && Array.isArray(value)) {
            formData.append(
              "imagensOrdem",
              JSON.stringify(
                value.map((img) => (typeof img === "string" ? img : img.url))
              )
            );
          } else {
            formData.append(key, String(value));
          }
        }
      });

      novasImagens.forEach((file) => formData.append("novasImagens", file));

      const res = await fetch(
        `https://threedtodesco.onrender.com/api/produtos/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Erro ao atualizar produto");

      alert("Produto atualizado!");
      setEditando(null);
      setFormEdicao({});
      setNovasImagens([]);
      fetchProdutos();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar produto");
    }
  };

  // Excluir produto
  const excluirProduto = async (id: string) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    try {
      const res = await fetch(
        `https://threedtodesco.onrender.com/api/produtos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Erro ao excluir produto");

      alert("Produto excluído!");
      setProdutos((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir produto");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {produtos.map((produto) => (
            <div key={produto._id} className="border p-4 rounded shadow-sm">
              {editando === produto._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="nome"
                    value={formEdicao.nome ?? produto.nome}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <textarea
                    name="descricao"
                    value={formEdicao.descricao ?? produto.descricao}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="preco"
                    value={formEdicao.preco ?? produto.preco}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="destaque"
                      checked={formEdicao.destaque ?? produto.destaque ?? false}
                      onChange={handleChange}
                    />
                    Destaque
                  </label>

                  {/* Mostrar imagens */}
                  <div>
                    <h3 className="font-semibold">Imagens atuais:</h3>
                    <div className="flex gap-2 overflow-x-auto py-2">
                      {(formEdicao.imagens ?? produto.imagens ?? []).map(
                        (img, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <img
                              src={img?.url}
                              alt={`Imagem ${i}`}
                              className="w-24 h-24 object-cover rounded border"
                            />
                            <div className="flex gap-1 mt-1">
                              <Button
                                size="sm"
                                onClick={() => moverImagem(i, "up")}
                              >
                                ⬆️
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => moverImagem(i, "down")}
                              >
                                ⬇️
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Upload novas imagens */}
                  <div>
                    <label className="block font-semibold">
                      Adicionar novas imagens
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleUploadImagens}
                      className="border p-2 rounded"
                    />
                    {novasImagens.length > 0 && (
                      <p className="text-sm text-gray-600">
                        {novasImagens.length} imagens selecionadas
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => salvarEdicao(produto._id)}
                      className="bg-green-600 text-white"
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setEditando(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold">{produto.nome}</h2>
                  <p>{produto.descricao}</p>
                  <p className="font-bold">R$ {produto.preco}</p>

                  {produto.imagens && (
                    <div className="flex gap-2 mt-2 overflow-x-auto">
                      {produto.imagens.map((img, i) => (
                        <img
                          key={i}
                          src={img.url} // ✅ corrigido
                          alt={`Produto ${produto.nome}`}
                          className="w-24 h-24 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 mt-2">
                    <Button
                      onClick={() => {
                        setEditando(produto._id);
                        setFormEdicao({
                          ...produto,
                          imagens: produto.imagens ? [...produto.imagens] : [],
                        });
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => excluirProduto(produto._id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
