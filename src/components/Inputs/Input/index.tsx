interface InputProps {
  type: string;
  label: string;
  placeholder: string;
  isDisabled?: boolean;
  name: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  inputWidth?: "max";
  required?: boolean;
}

export function Input({
  name,
  placeholder,
  label,
  type,
  isDisabled = false,
  error,
  value,
  onChange,
  inputWidth,
  required
}: InputProps) {
  return (
    <div className={inputWidth == 'max' ? "col-12 col-md-12 mb-4" : "col-12 col-md-6 mb-4"}>
      <label htmlFor={name} className="form-label fw-medium">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <input
        autoComplete="off"
        className="form-control border-2"
        placeholder={placeholder}
        disabled={isDisabled}
        type={type}
        id={name}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
