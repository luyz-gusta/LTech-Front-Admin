/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  label: string;
  placeholder: string;
  isDisabled?: boolean;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  required?: boolean;
}

export function Input({
  name,
  placeholder,
  label,
  type,
  register,
  isDisabled = false,
  rules,
  error,
  required = true,
}: InputProps) {
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
      />
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
