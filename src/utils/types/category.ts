import User from "./user";

export default interface Category {
  _id: string;
  nome: string;
  usuario: User;
  ativo?: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}
