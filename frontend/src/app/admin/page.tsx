"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import { toast } from "sonner";
import CadastroProdutoForm from "@/components/CadastroProdutosModal";
type ImagemProduto = {
  url: string;
  origem: string;
};

type Produto = {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  altura?: number | string;
  largura?: number | string;
  profundidade?: number | string;
  peso?: number | string;
  material?: string;
  origem?: string;
  categoria?: string;
  subcategoria?: string;
  imagens: ImagemProduto[];
  destaque: boolean;
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<string | null>(null);
  const [formEdicao, setFormEdicao] = useState<Partial<Produto>>({});
  const [novasImagens, setNovasImagens] = useState<File[]>([]);

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

  const handleUploadImagens = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNovasImagens(Array.from(e.target.files));
    }
  };

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
      toast.success("Produto atualizado com sucesso!");
      setEditando(null);
      setFormEdicao({});
      setNovasImagens([]);
      fetchProdutos();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar produto");
    }
  };

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
      toast.success("Produto excluído com sucesso!");
      setProdutos((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir produto");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Produtos</h1>
      {produtos.length === 0 ? (
        <p className="text-center">Nenhum produto cadastrado</p>
      ) : (
        <div className="flex flex-col gap-6">
          <CadastroProdutoForm />
          {produtos.map((produto) => (
            <div
              key={produto._id}
              className="border rounded-xl p-5 shadow-md bg-white"
            >
              {editando === produto._id ? (
                <div className="flex flex-col gap-6">
                  {/* Seção Geral */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col">
                      Nome do produto:
                      <input
                        type="text"
                        name="nome"
                        value={formEdicao.nome ?? produto.nome}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        placeholder="Nome do produto"
                      />
                    </label>

                    <label className="flex flex-col">
                      Preço:
                      <input
                        type="number"
                        name="preco"
                        value={formEdicao.preco ?? produto.preco}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        placeholder="Preço"
                      />
                    </label>

                    <label className="flex flex-col md:col-span-2">
                      Descrição:
                      <textarea
                        name="descricao"
                        value={formEdicao.descricao ?? produto.descricao}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        placeholder="Descrição"
                      />
                    </label>

                    <label className="flex flex-col">
                      Origem fotos:
                      <input
                        type="text"
                        name="origem"
                        value={formEdicao.origem ?? produto.origem}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        placeholder="Origem"
                      />
                    </label>

                    <label className="flex flex-col">
                      Material:
                      <input
                        type="text"
                        name="material"
                        value={formEdicao.material ?? produto.material ?? ""}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        placeholder="Material"
                      />
                    </label>

                    <label className="flex flex-col">
                      Categoria:
                      <input
                        type="text"
                        name="categoria"
                        value={formEdicao.categoria ?? produto.categoria ?? ""}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        placeholder="Categoria"
                      />
                    </label>

                    <label className="flex flex-col">
                      Subcategoria:
                      <input
                        type="text"
                        name="subcategoria"
                        value={
                          formEdicao.subcategoria ?? produto.subcategoria ?? ""
                        }
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        placeholder="Subcategoria"
                      />
                    </label>

                    <label className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        name="destaque"
                        checked={
                          formEdicao.destaque ?? produto.destaque ?? false
                        }
                        onChange={handleChange}
                      />
                      Destaque
                    </label>
                  </div>

                  {/* Seção Dimensões */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex flex-col">
                      Altura (cm):
                      <input
                        type="text"
                        name="altura"
                        value={formEdicao.altura ?? produto.altura ?? ""}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                      />
                    </label>
                    <label className="flex flex-col">
                      Largura (cm):
                      <input
                        type="text"
                        name="largura"
                        value={formEdicao.largura ?? produto.largura ?? ""}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                      />
                    </label>
                    <label className="flex flex-col">
                      Profundidade (cm):
                      <input
                        type="text"
                        name="profundidade"
                        value={
                          formEdicao.profundidade ?? produto.profundidade ?? ""
                        }
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                      />
                    </label>
                    <label className="flex flex-col">
                      Peso (g):
                      <input
                        type="text"
                        name="peso"
                        value={formEdicao.peso ?? produto.peso ?? ""}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                      />
                    </label>
                  </div>

                  {/* Seção Imagens */}
                  <div>
                    <h3 className="font-semibold mb-2">Imagens atuais</h3>
                    <div className="flex gap-3 overflow-x-auto py-2">
                      {(formEdicao.imagens ?? produto.imagens ?? []).map(
                        (img, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center bg-gray-50 p-2 rounded-lg shadow-sm"
                          >
                            <img
                              src={img?.url}
                              alt={`Imagem ${i}`}
                              className="w-28 h-28 object-cover rounded-lg border"
                            />
                            <div className="flex gap-1 mt-1">
                              <Button onClick={() => moverImagem(i, "up")}>
                                <IoIosArrowRoundUp className="size-5" />
                              </Button>
                              <Button onClick={() => moverImagem(i, "down")}>
                                <IoIosArrowRoundDown className="size-5" />
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-3">
                      <label className="block font-semibold mb-1">
                        Adicionar novas imagens
                      </label>
                      <input
                        type="file"
                        multiple
                        onChange={handleUploadImagens}
                        className="border p-2 rounded-lg"
                      />
                      {novasImagens.length > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                          {novasImagens.length} imagens selecionadas
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={() => salvarEdicao(produto._id)}
                      className="w-1/2 bg-green-600 text-white"
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setEditando(null)}
                      className="w-1/2"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <h2 className="text-xl font-semibold">{produto.nome}</h2>
                    <p className="font-bold text-green-700">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(produto.preco)}
                    </p>
                  </div>

                  <p className="text-gray-600">{produto.descricao}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <p>
                      <strong>Categoria:</strong> {produto.categoria}
                    </p>
                    <p>
                      <strong>Subcategoria:</strong> {produto.subcategoria}
                    </p>
                    <p>
                      <strong>Origem fotos:</strong> {produto.origem}
                    </p>
                    <p>
                      <strong>Material:</strong> {produto.material}
                    </p>
                    <p>
                      <strong>Altura:</strong> {produto.altura}
                    </p>
                    <p>
                      <strong>Largura:</strong> {produto.largura}
                    </p>
                    <p>
                      <strong>Profundidade:</strong> {produto.profundidade}
                    </p>
                    <p>
                      <strong>Peso:</strong> {produto.peso}
                    </p>
                    <p>
                      <strong>Destaque:</strong>{" "}
                      {produto.destaque ? "Sim" : "Não"}
                    </p>
                  </div>

                  {produto.imagens && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {produto.imagens.map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          alt={`Produto ${produto.nome}`}
                          className="w-36 h-36 object-cover rounded-lg border shadow-sm"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={() => {
                        setEditando(produto._id);
                        setFormEdicao({
                          ...produto,
                          imagens: produto.imagens ? [...produto.imagens] : [],
                        });
                      }}
                      className="w-1/2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => excluirProduto(produto._id)}
                      className="w-1/2"
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
