import { Modal } from "react-bootstrap";
import { Input } from "../../../../components/Input";
import { MouseEvent, useEffect, useState } from "react";
import FormButton from "../../../../components/Buttons/FormButton";
import { useContexts } from "../../../../hooks/useContexts";
import { baseApi } from "../../../../../services/api";
import ResponseAPI, { ResponseData } from "../../../../utils/types/response";
import { toast } from "react-toastify";
import Category from "../../../../utils/types/category";

interface CategoryModalProps {
  isShow: boolean;
  setIsShow: (show: boolean) => void;
  type: "create" | "edit";
  categoryValue?: Category;
  fetch: VoidFunction
}

export default function CategorydModal({
  isShow,
  setIsShow,
  type,
  categoryValue,
  fetch
}: CategoryModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const { user } = useContexts();

  useEffect(() => {
    if (type === "edit" && categoryValue != undefined) {
      setCategory(categoryValue.nome);
    }
  }, [categoryValue, type]);

  const handleCreate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      nome: category,
      usuario: user?._id,
    };

    await baseApi
      .post<ResponseAPI<ResponseData<Category[]>>>("categorias", body)
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          toast.success("Categoria criada com sucesso !");
          setError(undefined);
          setCategory("");
          setIsShow(false);
          fetch()
        }
      })
      .catch((error) => {
        if (error.response.data.body.error.nome != undefined) {
          setError(error.response.data.body.error.nome);
        } else {
          setError(error.response.data.body.error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      _id: categoryValue?._id,
      nome: category,
      usuario: user?._id,
    };

    await baseApi
      .put<ResponseAPI<ResponseData<Category[]>>>("categorias", body)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Categoria atualizada com sucesso !");
          setError(undefined);
          setCategory("");
          setIsShow(false);
          fetch()
        }
      })
      .catch((error) => {
        console.log(error);

        if (error.response.data.body.error.nome != undefined) {
          setError(error.response.data.body.error.nome);
        } else {
          setError(error.response.data.body.error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      show={isShow}
      onHide={() => {
        setError(undefined);
        setCategory("");
        setIsShow(false);
      }}
      keyboard={false}
      dialogClassName="modal-dialog-centered modal-dialog-scrollable"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "create" ? "Criar" : "Editar"} Categoria
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && (
          <button
            className={"col-12 btn px-4"}
            type="button"
            disabled
            style={{backgroundColor: '#311070', color: '#FFFFFF'}}
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
          <form>
            <Input
              inputWidth={"max"}
              label="Nome da categoria:"
              name="categoria"
              placeholder="Digite aqui ..."
              type="text"
              onChange={(e) => {
                if (e.length > 0) {
                  setError(undefined);
                } else {
                  setError("Escreva o nome da categoria.");
                }

                setCategory(e);
              }}
              value={category}
              error={error}
            />
            <FormButton
              text={type === "create" ? "Cadastrar" : "Atualizar"}
              onClick={type == "edit" ? handleUpdate : handleCreate}
            />
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}
