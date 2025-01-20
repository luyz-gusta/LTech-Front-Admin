import { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { baseApi } from "../../../services/api";
import { Container } from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import { useContexts } from "../../hooks/useContexts";
import filterTable from "../../utils/filterTable";
import Mask from "../../utils/types/mask";
import ResponseAPI, { SuccessResponse } from "../../utils/types/response";
import BrandModal from "./components/Modal";
import styles from "./styles.module.scss";
import DeleteBrandModal from "./components/ModalDeleteBrand";

export default function Brands() {
  const [brands, setBrands] = useState<Mask[]>([]);
  const [brandsFixed, setBrandsFixed] = useState<Mask[]>([]);
  const { setIsActiveLoading } = useContexts();
  const [textInput, setTextInput] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<"create" | "edit">("create");
  const [selectedBrand, setSelectedBrand] = useState<Mask | undefined>(
    undefined
  );
  const fetchBrands = async () => {
    setIsActiveLoading(true);
    const response = await baseApi.get<ResponseAPI<SuccessResponse<Mask[]>>>(
      "marcas/all"
    );

    setBrands(response.data.body.data);
    setBrandsFixed(response.data.body.data);
    setIsActiveLoading(false);
  };

  const toogleStatus = async (brand: Mask) => {
    setIsActiveLoading(true);
    const state = brand.ativo ? "ativar" : "desativar"
    await baseApi.put<ResponseAPI<SuccessResponse<Mask>>>(
      `marcas/${brand._id}/${state}`
    ).then(() => {
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setIsActiveLoading(false);
    })
  };

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterBrands = (textFilter: string) => {
    filterTable(setTextInput, textFilter, setBrands, brandsFixed);
  };

  return (
    <Container>
      <SectionTitle
        onClick={() => {
          setTypeModal("create");
          setSelectedBrand(undefined);
          setIsShowModal(true);
        }}
        title="Marca"
        valueInput={textInput}
        onChange={handleFilterBrands}
      />
      <div className={`table-responsive mt-4 ${styles.tableResponsive}`}>
        <table
          className={`table caption-top ${styles.table}`}
          style={{ whiteSpace: "nowrap" }}
        >
          <thead className={`table-dark ${styles.table__thead}`}>
            <tr>
              <th scope="col" className="col py-2 ps-4">
                Nome
              </th>
              <th scope="col" className="col py-2">
                Usuário
              </th>
              <th scope="col" className="col text-center py-2">
                Status
              </th>
              <th scope="col" className="col text-center py-2">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {brands?.map((mask, index) => (
              <tr key={mask._id}>
                <td className="align-middle px-4">{mask.nome}</td>
                <td className="align-middle">{mask.usuario.nome}</td>
                <td className="align-middle">
                  <div className="d-flex justify-content-center">
                    <span
                      onClick={() => {
                        const list = brands;
                        list[index].ativo = list[index].ativo ? false : true;
                        setBrands(list);

                        toogleStatus(mask);
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
                      <button
                        onClick={() => {
                          setTypeModal("edit");
                          setSelectedBrand(mask);
                          setIsShowModal(true);
                        }}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBrand(mask);
                          setIsShowDeleteModal(true);
                        }}
                      >
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
      <BrandModal
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        type={typeModal}
        brandValue={selectedBrand}
        fetch={fetchBrands}
      />

      <DeleteBrandModal
        fetch={fetchBrands}
        brand={selectedBrand}
        isShow={isShowDeleteModal}
        setIsShow={setIsShowDeleteModal}
      />
    </Container>
  );
}
