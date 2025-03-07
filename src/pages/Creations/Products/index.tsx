import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

export default function CreateProduct() {
  const [isInstallmentable, setIsInstallmentable] = useState<boolean>(false);
  const { brandsOptions, categoriesOptions } = useFetchOptions();
  const { setIsActiveLoading, user } = useContexts();
  const navigate = useNavigate();

  const {
    handleSubmit,
    watch,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("usuario", user?._id || "");
    setValue("precoPromocao", null);
  }, [setValue, user]);

  const onSubmit = async (data: FormData) => {
    const createProduct = async (product: FormData) => {
      setIsActiveLoading(true);

      await baseApi
        .post<ResponseAPI<ResponseData<Product[]>>>("produtos", product)
        .then((result) => {
          console.log(result);
          if (result.status === 201) {
            toast.success("Categoria criada com sucesso !");
            navigate("/admin/produtos");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.body.error.nome != undefined) {
            toast.error(error.response.data.body.error.nome);
          } else {
            toast.error(error.response.data.body.error.message);
          }
        })
        .finally(() => {
          setIsActiveLoading(false);
        });
    };
    console.log(data);

    createProduct(data);
  };

  return (
    <Container>
      <CreationContainer title="Novo Produto" subTitle="Cadastrar Produto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.formInputs}`}
        >
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
              error={errors.precoVenda?.message}
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
                rules={{
                  setValueAs: (value) => parseInt(value, 10) || 0,
                }}
              />
            )}

            <SwitchButton
              label="Em Estoque:"
              name="emEstoque"
              register={register}
              error={errors.emEstoque?.message}
            />

            <SwitchButton
              label="Produto em destaque:"
              name="destaque"
              register={register}
              error={errors.destaque?.message}
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
            setValue={setValue}
            error={errors.fotos?.message}
            trigger={trigger}
          />
          <FormButton
            text={"Cadastrar"}
            onClick={() => {}}
            specificClass="w-auto fs-5 p-2 px-5"
          />
        </form>
      </CreationContainer>
    </Container>
  );
}
