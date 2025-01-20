import { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { baseApi } from "../../../services/api";
import { Container } from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import Category from "../../utils/types/category";
import ResponseAPI, { SuccessResponse } from "../../utils/types/response";
import styles from "./styles.module.scss";
import { useContexts } from "../../hooks/useContexts";

export default function Categories() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoriesFixed, setCategoriesFixed] = useState<Category[] | null>(null);
  const { setIsActiveLoading } = useContexts();
  const [textInput, setTextInput] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      setIsActiveLoading(true);
      const response = await baseApi.get<
        ResponseAPI<SuccessResponse<Category[]>>
      >("categorias/all");

      setCategories(response.data.body.data);
      setCategoriesFixed(response.data.body.data);
      setIsActiveLoading(false);
    };

    fetchCategories();
  }, [setIsActiveLoading]);

  const handleFilter = (textFilter: string) => {
    setTextInput(textFilter);

    if (textFilter.length == 0) {
      setCategories(categoriesFixed);

      return
    }

    const categoriesFilted = categoriesFixed?.filter((category) =>
      category.nome.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase())
    );

    setCategories(categoriesFilted == undefined ? [] : categoriesFilted);
  };

  return (
    <Container>
      <SectionTitle title="Categoria" onChange={handleFilter} valueInput={textInput}/>
      <div className={`table-responsive mt-4 ${styles.tableResponsive}`}>
        <table
          className={`table caption-top ${styles.table}`}
          style={{ whiteSpace: "nowrap" }}
        >
          <thead className={`table-dark ${styles.table__thead}`}>
            <tr>
              <th scope="col" className="col ps-4 py-2">
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
            {categories?.map((category) => (
              <tr key={category._id}>
                <td className="align-middle ps-4">{category.nome}</td>
                <td className="align-middle">{category.usuario.nome}</td>
                <td className="align-middle">
                  <div className="d-flex justify-content-center">
                    <span
                      onClick={() => {
                        setCategories(
                          categories.map((categorySearch) =>
                            categorySearch._id === category._id
                              ? { ...category, ativo: !category.ativo }
                              : categorySearch
                          )
                        );
                      }}
                      className={`${styles.tag} ${
                        category.ativo ? styles.enable : styles.disable
                      }`}
                    >
                      {category.ativo ? "Ativo" : "Desativado"}
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
