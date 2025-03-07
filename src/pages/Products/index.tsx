import { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { baseApi } from "../../services/api";
import { Container } from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import { useContexts } from "../../hooks/useContexts";
import Product from "../../utils/types/product";
import ResponseAPI, { ResponseData } from "../../utils/types/response";
import styles from "./styles.module.scss";
import filterTable from "../../utils/filterTable";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "./components/ModalDeleteProduct";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsFixed, setProductsFixed] = useState<Product[]>([]);
  const { setIsActiveLoading } = useContexts();
  const [textInput, setTextInput] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setIsActiveLoading(true);
    const response = await baseApi.get<ResponseAPI<ResponseData<Product[]>>>(
      "produtos/all"
    );

    setProducts(response.data.body.data);
    setProductsFixed(response.data.body.data);
    setIsActiveLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toogleStatus = async (product: Product) => {
    setIsActiveLoading(true);
    const state = product.ativo ? "ativar" : "desativar";
    await baseApi
      .put<ResponseAPI<ResponseData<Product>>>(
        `produtos/${product._id}/${state}`
      )
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsActiveLoading(false);
      });
  };

  const handleFilterProducts = (textFilter: string) => {
    filterTable(setTextInput, textFilter, setProducts, productsFixed);
  };

  return (
    <Container>
      <SectionTitle
        onClick={() => navigate("/admin/criar-produto")}
        title="Produtos"
        valueInput={textInput}
        onChange={handleFilterProducts}
      />
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
                Imagem
              </th>
              <th scope="col" className="col" style={{ cursor: "pointer" }}>
                Nome Produto
              </th>
              <th scope="col" className="col" style={{ cursor: "pointer" }}>
                Categoria
              </th>
              <th
                scope="col"
                className="col text-center"
                style={{ cursor: "pointer" }}
              >
                Preço Venda
              </th>
              <th
                scope="col"
                className="col text-center"
                style={{ cursor: "pointer" }}
              >
                Preço Promoção
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
            {products?.map((product, index) => (
              <tr key={product._id}>
                <td className="text-center">
                  <img
                    src={product.fotos[0]}
                    alt="Imagem de usuário"
                    className={styles.profileUser}
                  />
                </td>
                <td className="align-middle">{product.nome}</td>
                <td className="align-middle">{product.categoria.nome}</td>
                <td className="align-middle text-center">
                  {product.precoVenda.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="align-middle text-center">
                  {product.precoPromocao
                    ? product.precoPromocao.toLocaleString("pt-br", {
                        minimumFractionDigits: 2,
                      })
                    : " - "}
                </td>
                <td className="align-middle">
                  <div className="d-flex justify-content-center">
                    <span
                      onClick={() => {
                        const list = products;
                        list[index].ativo = list[index].ativo ? false : true;
                        setProducts(list);

                        toogleStatus(product);
                      }}
                      className={`${styles.tag} ${
                        product.ativo ? styles.enable : styles.disable
                      }`}
                    >
                      {product.ativo ? "Ativo" : "Desativado"}
                    </span>
                  </div>
                </td>
                <td className="align-middle text-center">
                  <div className="d-flex justify-content-center">
                    <div className={`${styles.actions}`}>
                      <button>
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
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

      <DeleteProductModal
        fetch={fetchProducts}
        product={selectedProduct}
        isShow={isShowDeleteModal}
        setIsShow={setIsShowDeleteModal}
      />
    </Container>
  );
}
