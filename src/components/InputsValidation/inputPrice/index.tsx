/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import formatPrice from "../../../utils/formatPrice";

interface InputPriceProps {
  type: string;
  label: string;
  placeholder: string;
  isDisabled?: boolean;
  name: string;
  register: UseFormRegister<any>;
  trigger: UseFormTrigger<any>;
  error?: string;
  rules?: RegisterOptions;
  required?: boolean;
  setValue: UseFormSetValue<any>;
}

export function InputPrice({
  name,
  placeholder,
  label,
  type,
  register,
  isDisabled = false,
  rules,
  error,
  required = true,
  trigger,
  setValue,
}: InputPriceProps) {
  return (
    <div className="col-12 col-md-6 mb-4">
      <label htmlFor={name} className="form-label fw-medium">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <input
        autoComplete="off"
        className="inputFormStyles border-2"
        placeholder={placeholder}
        disabled={isDisabled}
        type={type}
        {...register(name, rules)}
        id={name}
        onChange={(e) => {
          const formattedValue = formatPrice(e.target.value);
          setValue(name, formattedValue);
          trigger(name);
        }}
      />
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
