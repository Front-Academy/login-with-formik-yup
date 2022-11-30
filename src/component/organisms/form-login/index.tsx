import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import Styles from "./styles.module.scss";

const FormLogin = () => {
  const router = useRouter();

  const ValidateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido!")
      .required("Email é obrigatório!"),
    password: Yup.string().required("Senha é obrigatório!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidateSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log("Erro: ", formik.errors);

  return (
    <div className={Styles.container}>
      <form className={Styles.form} onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          name="email"
          value={formik.values.email}
          placeholder="Email"
          type="text"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errorMsg={formik.errors.email}
        />
        <Input
          id="password"
          name="password"
          placeholder="Senha"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
