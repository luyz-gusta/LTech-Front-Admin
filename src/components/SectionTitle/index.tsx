import { FaPlus } from "react-icons/fa";
import styles from "./styles.module.scss";
import { IoIosSearch } from "react-icons/io";

export default function SectionTitle(props: {
  title: string;
  valueInput: string;
  onChange: (value: string) => void;
  onClick: VoidFunction;
}) {
  return (
    <div className={`${styles.title}`}>
      <h3>{props.title}</h3>

      <div className={`${styles.actions}`}>
        <div className={`${styles.inputGroup}`}>
          <IoIosSearch />
          <input
            type="search"
            value={props.valueInput || ''}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={`Buscar ${props.title.toLowerCase()}`}
          />
        </div>
        <button onClick={props.onClick}>
          Novo {props.title.toLowerCase()}
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
