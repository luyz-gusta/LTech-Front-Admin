import { z } from "zod";

const schema = z
  .object({
    nome: z.string().min(3).max(50),
    descricao: z.string().min(10),
    precoVenda: z.number(),
    precoPromocao: z.number().nullable(),
    quantidadeParcelas: z.number().optional(),
    usuario: z.string(),
    marca: z.string(),
    categoria: z.string(),
    dataAtualizacao: z.date().optional(),
    destaque: z.boolean().optional(),
    emEstoque: z.boolean().optional(),
    estadoProduto: z.enum(["Novo", "Usado", "Seminovo"]),
    fotos: z
      .string()
      .array()
      .or(z.string().url("Cada foto deve ser uma URL válida")),
  })
  .refine(
    (data) => {
      if (data.precoPromocao) {
        return data.precoVenda > data.precoPromocao;
      }
      return true;
    },
    {
      path: ["precoPromocao"],
      message:
        "O preço em promoção não pode ser maior que o preço padrão de venda.",
    }
  );

export type FormData = z.infer<typeof schema>;

export { schema };
