import { useEffect, useState } from "react"
import { Options } from "../../../../utils/types/options"
import { fetchBrands, fetchCategories } from "../utils/fetchOptions"

export const useFetchOptions = () => {
    const [brandsOptions, setBrandsOptions] = useState<Options>([])
    const [categoriesOptions, setCategoriesOptions] = useState<Options>([])

    useEffect(() => {
        const fetchData = async () => { 
            try {
                setBrandsOptions(await fetchBrands())
                setCategoriesOptions(await fetchCategories())
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }

        fetchData()
    }, [])

    return {
        brandsOptions,
        categoriesOptions,
    }
}