import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Container } from "../../../components/Container";
import CreationContainer from "../../../components/CreationContainer";
import { Input } from "../../../components/InputsValidation/Input";
import { SelectFilter } from "../../../components/InputsValidation/selectFilter";
import { useFetchOptions } from "./hooks/useFetchOptions";
import { FormData, schema } from "./schema";
import styles from "./styles.module.scss";
import { InputPrice } from "../../../components/InputsValidation/inputPrice";
import SwitchButton from "../../../components/Buttons/Switch";
import { useState } from "react";
import TextAreaEditor from "../../../components/TextArea";
import ImageCarousel from "../../../components/ImageCarousel";
import FormButton from "../../../components/Buttons/FormButton";

export default function CreateProduct() {
  const [isInstallmentable, setisInstallmentable] = useState<boolean>(false);
  const { brandsOptions, categoriesOptions } = useFetchOptions();

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

  const onSubmit = (data: FormData) => {
    console.log(data);
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
              type="tel"
              placeholder="0,00"
              label="Preço de venda:"
              name="precoVenda"
              error={errors.precoVenda?.message}
              register={register}
              setValue={setValue}
              trigger={trigger}
            />

            <InputPrice
              type="tel"
              placeholder="0,00"
              label="Preço em promoção:"
              name="precoPromocao"
              error={errors.precoVenda?.message}
              register={register}
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
              setChecked={setisInstallmentable}
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
