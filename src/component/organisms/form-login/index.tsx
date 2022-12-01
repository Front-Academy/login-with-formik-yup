import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import Styles from "./styles.module.scss";

const FormLogin = () => {
  const router = useRouter();

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={Styles.container}>
      <form className={Styles.form} onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Email"
          type="text"
          errorMsg={formik.errors.email}
        />
        <Input
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Senha"
          type="password"
          errorMsg={formik.errors.password}
        />
        <Button type="submit" title="Entrar" clique={() => console.log("oi")} />
        <p className={Styles.or}>OU</p>
        <Button
          title="Me cadastrar"
          kind="secundary"
          clique={() => router.push("/register")}
        />
      </form>
    </div>
  );
};

export default FormLogin;
