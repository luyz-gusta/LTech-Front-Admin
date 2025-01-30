import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface SelectProps {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  options: { value: string; label: string }[];
  required?: boolean
}

export function SelectInput({
  name,
  label,
  register,
  rules,
  error,
  options,
  required = true

}: SelectProps) {
  return (
    <div className="col-12 col-md-6 mb-4">
      <label htmlFor={name} className="form-label fw-medium">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <select {...register(name, rules)} className="form-select border-2">
        <option value="" selected disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
