import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import User from "../../utils/types/user";
import styles from "./styles.module.scss";
import { baseApi } from "../../../services/api";
import ResponseAPI, { SuccessResponse } from "../../utils/types/response";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useContexts } from "../../hooks/useContexts";

export default function Users() {
  const [users, setUsers] = useState<User[] | null>(null);
  const { setIsActiveLoading } = useContexts();

  useEffect(() => {
    const fetchUsers = async () => {
        setIsActiveLoading(true);
      const response = await baseApi.get<ResponseAPI<SuccessResponse<User[]>>>(
        "usuarios/all"
      );

      setUsers(response.data.body.data);
      setIsActiveLoading(false);
    };

    fetchUsers();
  }, [setIsActiveLoading]);

  return (
    <Container>
      <SectionTitle title="Usuário" />
      <div className={`table-responsive mt-4 ${styles.tableResponsive}`}>
        <table
          className={`table caption-top ${styles.table}`}
          style={{ whiteSpace: "nowrap" }}
        >
          <thead className={`table-dark ${styles.table__thead}`}>
            <tr>
              <th
                scope="col"
                className="col text-center"
                style={{ cursor: "pointer" }}
              >
                Foto de Perfil
              </th>
              <th scope="col" className="col" style={{ cursor: "pointer" }}>
                Nome
              </th>
              <th scope="col" className="col" style={{ cursor: "pointer" }}>
                Email
              </th>
              <th
                scope="col"
                className="col text-center"
                style={{ cursor: "pointer" }}
              >
                Tipo Usuário
              </th>
              <th
                scope="col"
                className="col text-center"
                style={{ cursor: "pointer" }}
              >
                Status
              </th>
              <th
                scope="col"
                className="col text-center"
                style={{ cursor: "pointer" }}
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users?.map((user) => (
              <tr key={user._id}>
                <td className="text-center">
                  <img
                    src={user.fotoPerfil}
                    alt="Imagem de usuário"
                    className={styles.profileUser}
                  />
                </td>
                <td className="align-middle">{user.nome}</td>
                <td className="align-middle">{user.email}</td>
                <td className="align-middle text-center">{user.tipoUsuario}</td>
                <td className="align-middle">
                  <div className="d-flex justify-content-center">
                    <span
                      onClick={() => {
                        setUsers(
                          users.map((userSearch) =>
                            userSearch._id === user._id
                              ? { ...user, ativo: !user.ativo }
                              : userSearch
                          )
                        );
                      }}
                      className={`${styles.tag} ${
                        user.ativo ? styles.enable : styles.disable
                      }`}
                    >
                      {user.ativo ? "Ativo" : "Desativado"}
                    </span>
                  </div>
                </td>
                <td className="align-middle text-center">
                  <div className="d-flex justify-content-center">
                    <div className={`${styles.actions}`}>
                      <button>
                        <FaRegEdit />
                      </button>
                      <button>
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
