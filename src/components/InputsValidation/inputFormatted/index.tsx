import { RegisterOptions, UseFormRegister } from "react-hook-form";
import InputMask from "react-input-mask-next";

interface InputProps {
  type: string;
  placeholder: string;
  isDisabled?: boolean;
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  mask: string;
  required?: boolean

}

export function InputFormatted({
  name,
  placeholder,
  isDisabled = false,
  register,
  rules,
  type,
  label,
  error,
  mask,
  required = true

}: InputProps) {
  return (
    <div className="col-12 col-md-6 mb-4">
      <label htmlFor={name} className="form-label fw-medium">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <InputMask
        type={type}
        autoComplete="off"
        disabled={isDisabled}
        maskPlaceholder={null}
        className="inputFormStyles border-2"
        placeholder={placeholder}
        id={name}
        {...register(name, rules)}
        mask={mask}
      />
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
