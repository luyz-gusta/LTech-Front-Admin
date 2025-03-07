/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import ReactInputMask from "react-input-mask-next";

interface InputPriceProps {
  label: string;
  placeholder: string;
  isDisabled?: boolean;
  name: string;
  trigger: UseFormTrigger<any>;
  error?: string;
  required?: boolean;
  setValue: UseFormSetValue<any>;
}

export function InputPrice({
  name,
  placeholder,
  label,
  isDisabled = false,
  error,
  required = true,
  trigger,
  setValue,
}: InputPriceProps) {
  const [formattedValue, setFormattedValue] = useState("");

  const handleChange = (valueInput: string, name: string) => {
    const value = valueInput.replace(/\D/g, "");
    const numericValue = (parseFloat(value) / 100).toFixed(2);
    let formattedValue = numericValue.replace(".", ",");
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

    setValue(name, Number(numericValue));
    trigger(name);

    return formattedValue;
  };

  return (
    <div className="col-12 col-md-6 mb-4">
      <label htmlFor={name} className="form-label fw-medium">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>

      <ReactInputMask
        type="tel"
        maskPlaceholder={null}
        mask={""}
        autoComplete="off"
        className="inputFormStyles border-2"
        placeholder={placeholder}
        disabled={isDisabled}
        // {...register(name, rules)}
        value={formattedValue}
        id={name}
        onChange={(e) => {
          const formatted = handleChange(e.target.value, name);
          setFormattedValue(formatted);
        }}
      />
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
