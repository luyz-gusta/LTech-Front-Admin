/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.scss";

interface SwitchButtonProps {
  label: string;
  required?: boolean;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  checked?: boolean;
  setChecked?: (checked: boolean) => void
}

export default function SwitchButton({
  name,
  label,
  register,
  rules,
  error,
  required = true,
  checked = undefined,
  setChecked = undefined,
}: SwitchButtonProps) {
  return (
    <div className="col-12 col-md-6 mb-4">
      <label htmlFor={name} className="form-label fw-medium">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className={`${styles.canToggle} ${styles.canToggleSizeLarge}`}>
        <input
          id={name}
          type="checkbox"
          {...register(name, rules)}
          onChange={(e) => {
            if(setChecked){
                setChecked(e.target.checked);
            }
          }}
          checked={checked && checked}
        />
        <label htmlFor={name}>
          <div
            className={styles.canToggleSwitch}
            data-checked="Sim"
            data-unchecked="Não"
          ></div>
        </label>
      </div>
      {error && <p className="my-1 text-danger">{error}</p>}
    </div>
  );
}
