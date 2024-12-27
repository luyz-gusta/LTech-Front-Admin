import { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { baseApi } from "../../../services/api";
import { Container } from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import { useContexts } from "../../hooks/useContexts";
import Mask from "../../utils/types/mask";
import ResponseAPI, { SuccessResponse } from "../../utils/types/response";
import styles from "./styles.module.scss";

export default function Brands() {
  const [brands, setBrands] = useState<Mask[] | null>(null);
  const { setIsActiveLoading } = useContexts();
  
  useEffect(() => {
    const fetchBrands = async () => {
      setIsActiveLoading(true);
      const response = await baseApi.get<ResponseAPI<SuccessResponse<Mask[]>>>(
        "marcas/all"
      );

      setBrands(response.data.body.data);
      setIsActiveLoading(false);
    };

    fetchBrands();
  }, [setIsActiveLoading]);

  return (
    <Container>
      <SectionTitle title="Marca" />
      <div className={`table-responsive mt-4 ${styles.tableResponsive}`}>
        <table
          className={`table caption-top ${styles.table}`}
          style={{ whiteSpace: "nowrap" }}
        >
          <thead className={`table-dark ${styles.table__thead}`}>
            <tr>
              <th
                scope="col"
                className="col text-center py-2"
                
              >
                Nome
              </th>
              <th scope="col" className="col py-2" >
                Usuário
              </th>
              <th
                scope="col"
                className="col text-center py-2"
                
              >
                Status
              </th>
              <th
                scope="col"
                className="col text-center py-2"
                
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {brands?.map((mask) => (
              <tr key={mask._id}>
                <td className="align-middle text-center">{mask.nome}</td>
                <td className="align-middle">{mask.usuario.nome}</td>
                <td className="align-middle">
                  <div className="d-flex justify-content-center">
                    <span
                      onClick={() => {
                        setBrands(
                          brands.map((maskSearch) =>
                            maskSearch._id === mask._id
                              ? { ...mask, ativo: !mask.ativo }
                              : maskSearch
                          )
                        );
                      }}
                      className={`${styles.tag} ${
                        mask.ativo ? styles.enable : styles.disable
                      }`}
                    >
                      {mask.ativo ? "Ativo" : "Desativado"}
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
