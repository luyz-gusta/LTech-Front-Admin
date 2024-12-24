export type TipoUsuario = "Admin" | "Client";

export default interface User {
  _id: string;
  nome: string;
  usuario: string;
  email: string;
  senha: string;
  ativo?: boolean;
  ultimoLogin?: Date | null;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
  tipoUsuario: TipoUsuario;
  fotoPerfil: string;
}

