"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ProdutoForm {
  nome: string;
  descricao: string;
  preco: string;
  altura: string;
  largura: string;
  profundidade: string;
  peso: string;
  origem: string;
  categoria: string;
  subcategoria: string;
  material: string;
  destaque: boolean;
}

export default function CadastroProdutoModal() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<ProdutoForm>({
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

  const [imagens, setImagens] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, String(value))
      );
      imagens.forEach((file) => formData.append("imagens", file));

      const res = await fetch(
        "https://threedtodesco.onrender.com/api/produtos",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erro ao cadastrar produto");

      toast.success("Produto cadastrado com sucesso!");
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
      setOpen(false); // fecha o modal
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        toast.error(err.message || "Erro ao cadastrar produto");
      } else {
        toast.error("Erro desconhecido ao cadastrar produto");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Cadastrar Produto</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastrar Produto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <Input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <Textarea
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            required
            maxLength={255}
          />
          <Input
            type="number"
            name="preco"
            placeholder="Preço"
            value={form.preco}
            onChange={handleChange}
            required
          />
          <Label>Imagens</Label>
          <Input
            type="file"
            multiple
            onChange={(e) =>
              e.target.files && setImagens(Array.from(e.target.files))
            }
            required
          />
          <Input
            type="number"
            name="altura"
            placeholder="Altura"
            value={form.altura}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="largura"
            placeholder="Largura"
            value={form.largura}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="profundidade"
            placeholder="Profundidade"
            value={form.profundidade}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="peso"
            placeholder="Peso"
            value={form.peso}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="origem"
            placeholder="Origem da Imagem"
            value={form.origem}
            onChange={handleChange}
          />
          <Label>Categoria</Label>
          <Select
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, categoria: value }))
            }
            value={form.categoria}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Games">Games</SelectItem>
              <SelectItem value="Animes">Animes</SelectItem>
              <SelectItem value="Filmes e Séries">Filmes e Séries</SelectItem>
              <SelectItem value="Decorativos">Decorativos</SelectItem>
              <SelectItem value="Organizadores">Organizadores</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            name="subcategoria"
            placeholder="Subcategoria"
            value={form.subcategoria}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="material"
            placeholder="Material"
            value={form.material}
            onChange={handleChange}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              id="destaque"
              checked={form.destaque}
              onCheckedChange={(checked: boolean | "indeterminate") =>
                setForm((prev) => ({ ...prev, destaque: checked === true }))
              }
            />
            <Label htmlFor="destaque">Produto em destaque</Label>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar Produto"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
