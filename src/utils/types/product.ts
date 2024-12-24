import Category from "./category";
import Mask from "./mask";
import User from "./user";

export type EstadoProduto = "Novo" | "Seminovo" | "Usado";

export default interface Product {
  _id: string;
  nome: string;
  descricao: string;
  precoVenda: number;
  precoPromocao?: number;
  qntdParcelas?: number;
  fotos: Array<string>;
  ativo?: boolean;
  emEstoque?: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
  marca: Mask;
  categoria: Category;
  usuario: User;
  estadoProduto: EstadoProduto;
  destaque?: boolean;
}
