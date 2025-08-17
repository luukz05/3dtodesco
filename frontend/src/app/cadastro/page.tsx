"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CadastroProdutoForm() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    altura: "",
    largura: "",
    profundidade: "",
    peso: "",
    origem: "",
    categoria: "",
    material: "",
  });

  const [imagem, setImagem] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imagem) formData.append("imagens", imagem);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/produtos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao cadastrar produto");

      alert("Produto cadastrado com sucesso!");
      setForm({
        nome: "",
        descricao: "",
        preco: "",
        altura: "",
        largura: "",
        profundidade: "",
        peso: "",
        origem: "",
        categoria: "",
        material: "",
      });
      setImagem(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 flex flex-col gap-4"
    >
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <textarea
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="preco"
        placeholder="Preço"
        value={form.preco}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="file"
        name="imagens"
        onChange={(e) => e.target.files && setImagem(e.target.files[0])}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="altura"
        placeholder="Altura"
        value={form.altura}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="largura"
        placeholder="Largura"
        value={form.largura}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="profundidade"
        placeholder="Profundidade"
        value={form.profundidade}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="peso"
        placeholder="Peso"
        value={form.peso}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="origem"
        placeholder="Origem"
        value={form.origem}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="categoria"
        placeholder="Categoria"
        value={form.categoria}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="material"
        placeholder="Material"
        value={form.material}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <Button type="submit" className="bg-blue-600 text-white">
        Cadastrar Produto
      </Button>
    </form>
  );
}
