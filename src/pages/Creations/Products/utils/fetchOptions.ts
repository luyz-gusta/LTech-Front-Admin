import { baseApi } from "../../../../services/api";
import Category from "../../../../utils/types/category";
import Mask from "../../../../utils/types/mask";
import { Options } from "../../../../utils/types/options";
import { DefaultResponse } from "../../../../utils/types/response";

export const fetchBrands = async (): Promise<Options> => {
  const response = await baseApi.get<DefaultResponse<Mask[]>>("/marcas");
  return response.data.body.data.map((item) => ({
    value: item._id,
    label: item.nome,
  }));
};

export const fetchCategories = async (): Promise<Options> => {
    const response = await baseApi.get<DefaultResponse<Category[]>>("/categorias");
    return response.data.body.data.map((item) => ({
      value: item._id,
      label: item.nome,
    }));
  };
