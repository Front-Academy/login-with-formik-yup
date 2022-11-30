import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import Styles from "./styles.module.scss";

const FormLogin = () => {
  return (
    <div className={Styles.container}>
      <form className={Styles.form}>
        <Input placeholder="Email" type="text" />
        <Input placeholder="Senha" type="password" />
        <Button type="submit" title="Entrar" clique={() => console.log("oi")} />
        <p className={Styles.or}>OU</p>
        <Button
          title="Me cadastrar"
          kind="secundary"
          clique={() => console.log("teste")}
        />
      </form>
    </div>
  );
};

export default FormLogin;
