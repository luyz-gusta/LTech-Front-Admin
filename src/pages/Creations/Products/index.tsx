import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormButton from "../../../components/Buttons/FormButton";
import SwitchButton from "../../../components/Buttons/Switch";
import { Container } from "../../../components/Container";
import CreationContainer from "../../../components/CreationContainer";
import ImageCarousel from "../../../components/ImageCarousel";
import { Input } from "../../../components/InputsValidation/Input";
import { InputPrice } from "../../../components/InputsValidation/inputPrice";
import { SelectFilter } from "../../../components/InputsValidation/selectFilter";
import TextAreaEditor from "../../../components/TextArea";
import { useContexts } from "../../../hooks/useContexts";
import { baseApi } from "../../../services/api";
import Product from "../../../utils/types/product";
import ResponseAPI, { ResponseData } from "../../../utils/types/response";
import { useFetchOptions } from "./hooks/useFetchOptions";
import { FormData, schema } from "./schema";
import styles from "./styles.module.scss";

export default function CreateOrEditProduct() {
  const [isInstallmentable, setIsInstallmentable] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { brandsOptions, categoriesOptions } = useFetchOptions();
  const { setIsActiveLoading, user } = useContexts();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    handleSubmit,
    watch,
    register,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const fetchProducts = async () => {
    setIsEditMode(true);
    setIsActiveLoading(true);
    await baseApi
      .get<ResponseAPI<ResponseData<Product>>>(`produtos/${id}`)
      .then(({ data }) => {
        const produto = data.body.data;
        console.log(getValues());
        console.log(produto);
        setValue("nome", produto.nome);
        setValue("descricao", produto.descricao);
        setValue("precoVenda", produto.precoVenda);
        setValue("precoPromocao", produto.precoPromocao ?? null);
        setValue("quantidadeParcelas", produto.qntdParcelas || 0);
        setValue("fotos", produto.fotos);
        setValue("categoria", produto.categoria?._id);
        setValue("marca", produto.marca?._id);
        setValue("usuario", produto.usuario?._id);
        setValue("estadoProduto", produto.estadoProduto);
        setValue("destaque", produto.destaque ?? false);
        setValue("emEstoque", produto.emEstoque ?? true);
        if (produto.qntdParcelas) setIsInstallmentable(true);
      })
      .catch(() => {
        toast.error("Erro ao carregar produto.");
        navigate("/admin/produtos");
      })
      .finally(() => setIsActiveLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchProducts();
    } else {
      setValue("usuario", user?._id || "");
      setValue("precoPromocao", null);
    }
  }, [id, setValue, user]);

  const onSubmit = async (data: FormData) => {
    setIsActiveLoading(true);

    const request = isEditMode
      ? baseApi.put(`/produtos/${id}`, data)
      : baseApi.post("produtos", data);

    request
      .then((result) => {
        const msg = isEditMode
          ? "Produto atualizado com sucesso!"
          : "Produto cadastrado com sucesso!";
        console.log(result);
        toast.success(msg);
        navigate("/admin/produtos");
      })
      .catch((error) => {
        const err = error.response.data.body.error;
        toast.error(err?.nome || err?.message || "Erro inesperado");
      })
      .finally(() => setIsActiveLoading(false));
  };

  return (
    <Container>
      <CreationContainer
        title={isEditMode ? "Editar Produto" : "Novo Produto"}
        subTitle={
          isEditMode ? "Atualizar informações do produto" : "Cadastrar Produto"
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formInputs}>
          <div className="row mt-3">
            <Input
              type="text"
              placeholder="Digite o nome do produto ..."
              label="Nome do produto:"
              name="nome"
              error={errors.nome?.message}
              register={register}
            />

            <SelectFilter
              watch={watch}
              label="Categoria:"
              name="categoria"
              options={categoriesOptions}
              register={register}
              setValue={setValue}
              trigger={trigger}
              error={errors.categoria?.message}
            />

            <SelectFilter
              watch={watch}
              label="Marca:"
              name="marca"
              options={brandsOptions}
              register={register}
              setValue={setValue}
              trigger={trigger}
              error={errors.marca?.message}
            />

            <InputPrice
              placeholder="0,00"
              label="Preço de venda:"
              name="precoVenda"
              error={errors.precoVenda?.message}
              setValue={setValue}
              trigger={trigger}
            />

            <InputPrice
              placeholder="0,00"
              label="Preço em promoção:"
              name="precoPromocao"
              error={errors.precoPromocao?.message}
              setValue={setValue}
              trigger={trigger}
              required={false}
            />

            <SelectFilter
              watch={watch}
              label="Estado do produto:"
              name="estadoProduto"
              options={[
                { label: "Novo", value: "Novo" },
                { label: "Seminovo", value: "Seminovo" },
                { label: "Usado", value: "Usado" },
              ]}
              register={register}
              setValue={setValue}
              trigger={trigger}
              error={errors.estadoProduto?.message}
            />

            <SwitchButton
              label="Possui Parcelamento:"
              name="possuiParcelamento"
              register={register}
              checked={isInstallmentable}
              setChecked={setIsInstallmentable}
            />

            {isInstallmentable && (
              <Input
                type="number"
                placeholder="Digite a quantidade de parcelas ..."
                label="Quantidade de parcelas:"
                name="quantidadeParcelas"
                error={errors.quantidadeParcelas?.message}
                register={register}
                required={isInstallmentable}
                rules={{ setValueAs: (value) => parseInt(value, 10) || 0 }}
              />
            )}

            <SwitchButton
              label="Em Estoque:"
              name="emEstoque"
              register={register}
              error={errors.emEstoque?.message as string | undefined}
            />

            <SwitchButton
              label="Produto em destaque:"
              name="destaque"
              register={register}
              error={errors.destaque?.message as string | undefined}
            />

            <TextAreaEditor
              trigger={trigger}
              label="Descrição"
              name="descricao"
              setValue={setValue}
              register={register}
              error={errors.descricao?.message}
            />
          </div>

          <ImageCarousel
            name="fotos"
            watch={watch}
            setValue={setValue}
            error={errors.fotos?.message}
            trigger={trigger}
          />

          <FormButton
            text={isEditMode ? "Atualizar" : "Cadastrar"}
            onClick={() => {}}
            specificClass="w-auto fs-5 p-2 px-5"
          />
        </form>
      </CreationContainer>
    </Container>
  );
}
