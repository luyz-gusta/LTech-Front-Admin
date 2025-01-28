import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { FaPlus } from "react-icons/fa";

export default function CreationContainer({
  children,
  title,
  subTitle
}: {
  children: ReactNode;
  title: string;
  subTitle: string;
}) {
  return (
    <div className={`${styles.container}`}>
      <section className={`${styles.title}`}>
        <FaPlus />
        <h1>{title}</h1>
      </section>
      <section className={`${styles.box}`}>
        <h3>{subTitle}</h3>
        {children}
      </section>
    </div>
  );
}
