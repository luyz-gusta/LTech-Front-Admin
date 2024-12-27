import { FaPlus } from "react-icons/fa";
import styles from "./styles.module.scss";
import { IoIosSearch } from "react-icons/io";

export default function SectionTitle(props: { title: string }) {
  return (
    <div className={`${styles.title}`}>
      <h3>{props.title}</h3>

      <div className={`${styles.actions}`}>
        <div className={`${styles.inputGroup}`}>
          <IoIosSearch />
          <input type="search" placeholder={`Buscar ${props.title.toLowerCase()}`} />
        </div>
        <button>
          Novo {props.title.toLowerCase()}
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
