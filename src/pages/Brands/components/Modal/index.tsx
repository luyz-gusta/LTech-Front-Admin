import { Modal } from "react-bootstrap";
import { Input } from "../../../../components/Input";
import { MouseEvent, useEffect, useState } from "react";
import FormButton from "../../../../components/Buttons/FormButton";
import Mask from "../../../../utils/types/mask";
import { useContexts } from "../../../../hooks/useContexts";
import { baseApi } from "../../../../services/api";
import ResponseAPI, { ResponseData } from "../../../../utils/types/response";
import { toast } from "react-toastify";

interface BrandModalProps {
  isShow: boolean;
  setIsShow: (show: boolean) => void;
  type: "create" | "edit";
  brandValue?: Mask;
  fetch: VoidFunction
}

export default function BrandModal({
  isShow,
  setIsShow,
  type,
  brandValue,
  fetch
}: BrandModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [brand, setBrand] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const { user } = useContexts();

  useEffect(() => {
    if (type === "edit" && brandValue != undefined) {
      setBrand(brandValue.nome);
    }
  }, [brandValue, type]);

  const handleCreate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      nome: brand,
      usuario: user?._id,
    };

    await baseApi
      .post<ResponseAPI<ResponseData<Mask[]>>>("marcas", body)
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          toast.success("Marca criada com sucesso !");
          setError(undefined);
          setBrand("");
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
      _id: brandValue?._id,
      nome: brand,
      usuario: user?._id,
    };

    await baseApi
      .put<ResponseAPI<ResponseData<Mask[]>>>("marcas", body)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Marca atualizada com sucesso !");
          setError(undefined);
          setBrand("");
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
        setBrand("");
        setIsShow(false);
      }}
      keyboard={false}
      dialogClassName="modal-dialog-centered modal-dialog-scrollable"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {type === "create" ? "Criar" : "Editar"} Marca
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
              label="Nome da marca:"
              name="marca"
              placeholder="Digite aqui ..."
              type="text"
              onChange={(e) => {
                if (e.length > 0) {
                  setError(undefined);
                } else {
                  setError("Escreva o nome da marca.");
                }

                setBrand(e);
              }}
              value={brand}
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
