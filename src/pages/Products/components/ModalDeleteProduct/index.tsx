import { MouseEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { baseApi } from "../../../../services/api";
import Product from "../../../../utils/types/product";
import ResponseAPI, { ResponseData } from "../../../../utils/types/response";

interface ProductModalProps {
  isShow: boolean;
  setIsShow: (show: boolean) => void;
  fetch: VoidFunction;
  product?: Product;
}

export default function DeleteProductModal({
  isShow,
  setIsShow,
  fetch,
  product,
}: ProductModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    await baseApi
      .delete<ResponseAPI<ResponseData<undefined>>>(`produtos/${product?._id}`)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Produto excluído com sucesso !");
          setIsShow(false);
          fetch();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      show={isShow}
      onHide={() => {
        setIsShow(false);
      }}
      keyboard={false}
      dialogClassName="modal-dialog-centered modal-dialog-scrollable"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <Modal.Title className="text-center">
          Excluir o produto {product?.nome} ?
        </Modal.Title>
        {loading && (
          <button
            className={"col-8 col-md-8 btn px-4 mt-4"}
            type="button"
            disabled
            style={{ backgroundColor: "#311070", color: "#FFFFFF" }}
          >
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden" role="status">
              Loading...
            </span>
          </button>
        )}

        {!loading && (
          <form className="d-flex justify-content-center gap-4 mt-4 w-100">
            <button
              style={{ backgroundColor: "#311070", color: "#FFFFFF" }}
              className="btn col-md-4"
              onClick={handleDelete}
            >
              Sim
            </button>
            <button
              className="btn btn-secondary col-md-4"
              onClick={() => setIsShow(false)}
            >
              Não
            </button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}
