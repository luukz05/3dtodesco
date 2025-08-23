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
    categoria: "", // ✅ já no form
    subcategoria: "",
    material: "",
    destaque: false,
  });

  const [imagens, setImagens] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, String(value))
    );

    imagens.forEach((file) => formData.append("imagens", file));

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
        subcategoria: "",
        material: "",
        destaque: false,
      });
      setImagens([]);
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
        maxLength={255}
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
        multiple
        onChange={(e) =>
          e.target.files && setImagens(Array.from(e.target.files))
        }
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

      {/* Categoria (fixa) */}
      <label className="block mb-2">Categoria</label>
      <select
        name="categoria" // ✅ agora faz parte do form
        value={form.categoria}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-4"
        required
      >
        <option value="">Selecione uma categoria</option>
        <option value="Games">Games</option>
        <option value="Animes">Animes</option>
        <option value="Filmes e Séries">Filmes e Séries</option>
        <option value="Decorativos">Decorativos</option>
        <option value="Organizadores">Organizadores</option>
      </select>

      {/* Subcategoria (livre) */}
      <input
        type="text"
        name="subcategoria"
        placeholder="Subcategoria"
        value={form.subcategoria}
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

      {/* Checkbox destaque */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="destaque"
          checked={form.destaque}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <span>Produto em destaque</span>
      </label>

      <Button type="submit" className="bg-blue-600 text-white">
        Cadastrar Produto
      </Button>
    </form>
  );
}
