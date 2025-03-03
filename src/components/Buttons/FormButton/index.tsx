import { MouseEvent } from "react";
import styles from "./styles.module.scss";

export default function FormButton({
  text,
  onClick,
  specificClass,
}: {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  specificClass?: string;
}) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${styles.btn} ${specificClass}`}
    >
      {text}
    </button>
  );
}
