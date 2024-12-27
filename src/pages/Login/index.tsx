import styles from "./styles.module.scss";
import imgSection from "../../assets/ltech-section.jpg";
import { FormEvent, useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const auth = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    auth.login(user, password, checked, "/admin");
  };

  return (
    <section className={`${styles.container}`}>
      <main>
        <img
          src={imgSection}
          alt="Imagem section"
          className={`${styles.imgSection}`}
        />
        <div className={`${styles.boxForm}`}>
          <form onSubmit={handleSubmit}>
            <h1>Bem vindo de volta ao L-Tech System</h1>
            <div className={`${styles.formGroup} ${styles.field}`}>
              <input
                type="text"
                className={`${styles.formField}`}
                placeholder="Usuário"
                required
                name="user"
                autoComplete="off"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <label htmlFor="user" className={styles.formLabel}>
                Usuário
              </label>
            </div>
            <div className={`${styles.formGroup} ${styles.inputPassword}`}>
              <input
                type={visible ? "text" : "password"}
                className={`${styles.formField}`}
                placeholder="Senha"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className={styles.formLabel}>
                Senha
              </label>
              <div
                className={`${styles.iconPassword}`}
                onClick={() => setVisible(!visible)}
                style={{ cursor: "pointer" }}
              >
                {visible ? <PiEyeBold /> : <PiEyeClosedBold />}
              </div>
            </div>
            <div className={`${styles.boxBtn}`}>
              <div className={styles.formGroupCheckbox}>
                <div className={styles.squaredThree}>
                  <input
                    type="checkbox"
                    id="squaredThree"
                    name="check"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <label
                    htmlFor="squaredThree"
                    title="Seu usuário ficará salvo e não precisará logar novamente."
                  ></label>
                </div>
                <label htmlFor="rememberPassword">Lembrar de mim</label>
              </div>
              <button type="submit" className={`${styles.btnSend}`}>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer>©2024 L-TECH. Todos os direitos reservados</footer>
    </section>
  );
}
