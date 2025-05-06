import styles from "./styles.module.scss";

export default function Header() {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.boxUser}`}>
        <img
          src="https://res.cloudinary.com/drwk6ohcn/image/upload/v1732725746/luyz.gusta-2024-11-27.jpg"
          alt="Imagem de usuário"
        />
        <div className={styles.info}>
          <p>Luiz</p>
          <span>Admin</span>
        </div>
        {/* <IoIosArrowDown /> */}
      </div>
    </header>
  );
}
