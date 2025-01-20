import { MouseEvent } from "react";
import styles from "./styles.module.scss";

export default function FormButton({
  text,
  onClick,
}: {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button type="submit" onClick={onClick} className={`${styles.btn}`}>
      {text}
    </button>
  );
}
