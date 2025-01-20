import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { FaPlus } from "react-icons/fa";

export default function CreationContainer({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className={`${styles.container}`}>
      <section className={`${styles.title}`}>
        <FaPlus />
        <h1>{title}</h1>
      </section>
      <section className={`${styles.box}`}>
        <h3>Cadastrar {title.split(' ')[1]}</h3>
        {children}
      </section>
    </div>
  );
}
