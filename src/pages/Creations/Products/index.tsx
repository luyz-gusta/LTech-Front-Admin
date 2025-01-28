import { Container } from "../../../components/Container";
import CreationContainer from "../../../components/CreationContainer";
import { Input } from "../../../components/Inputs/Input";
import styles from './styles.module.scss'

export default function CreateProduct() {
  return (
    <Container>
      <CreationContainer title="Novo Produto" subTitle="Cadastrar Produto">
        <form className={`${styles.formInputs}`}>
          <div className="row mt-3">
            <Input
              label="Nome do produto:"
              name="productName"
              type="text"
              placeholder="Nome do produto"
              value=""
              onChange={() => {}}
              required={true}
            />
            <Input
              label="Nome do produto:"
              name="productName"
              type="text"
              placeholder="Nome do produto"
              value=""
              onChange={() => {}}
              required={true}
            />
          </div>
        </form>
      </CreationContainer>
    </Container>
  );
}
