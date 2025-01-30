/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Options } from "../../../utils/types/options";

interface SelectProps {
  name: string;
  label: string;
  isDisabled?: boolean;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
  watch: UseFormWatch<any>;
  error?: string;
  rules?: RegisterOptions;
  options: Options;
  changeFunc?: () => void;
  required?: boolean;
}

export function SelectFilter({
  name,
  register,
  setValue,
  trigger,
  watch,
  isDisabled = false,
  rules,
  label,
  error,
  options,
  changeFunc,
  required = true,
}: SelectProps) {
  const animatedComponents = makeAnimated();

  const selectedValue = watch(name);

  return (
    <div className="col-12 col-md-6 mb-4">
      <label htmlFor={name} className="form-label fw-medium">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <Select
        noOptionsMessage={() => "Sem opções"}
        components={animatedComponents}
        isClearable={true}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'rgb(129, 77, 229, .25)',
            primary: '#541cc1',
          },
        })}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: "#dee2e6",
            borderWidth: "2px",
            borderRadius: "0.375rem",
            "&:hover": {
              borderColor: "#dee2e6",
              borderWidth: "2px",
              borderRadius: "0.375rem",
            },
            "&:focus-within": {
              outline: "0",
              borderColor: "#541cc1",
              boxShadow: "0 0 0 .25rem rgba(84, 28, 193, .25)",
            },
            "& > option": {
              backgroundColor: 'red'
            }
          }),
        }}
        isDisabled={isDisabled}
        options={options}
        value={options.find((option) => option.value === selectedValue)}
        {...register(name, rules)}
        classNamePrefix="select"
        onChange={(option) => {
          setValue(name, option && "value" in option ? option.value : "");
          trigger(name);
          if (changeFunc != null) {
            changeFunc();
          }
        }}
        placeholder="Selecione uma opção"
      />
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
