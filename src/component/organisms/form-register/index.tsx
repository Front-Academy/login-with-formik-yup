import { FieldArray, Formik, getIn } from "formik";
import Link from "next/link";
import * as Yup from "yup";

import { StringFormat } from "../../../utils/StringFormat";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import Styles from "./styles.module.scss";

const FormRegister = () => {
  const shema = Yup.object().shape({
    name: Yup.string().required("Nome é um campo obrigatório!"),
    cpf: Yup.string()
      .matches(/([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})(.*)/, "CPF inválido!")
      .required("CPF é um campo obrigatório!"),
    birthday: Yup.date().required("Data de nascimento é obrigatório!"),
    email: Yup.string()
      .email("Email inválido!")
      .required("Email é obrigatório!"),
    paswword: Yup.string().required("Senha é obrigatória!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("paswword"), null], "As senhas devem ser iguais!")
      .required("Confirmação de senha é obrigatória!"),
    projectos: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Titulo é obrigatório!"),
        url: Yup.string().required("URL é obrigatório!"),
      })
    ),
  });

  return (
    <>
      <div className={Styles.container}>
        <Formik
          initialValues={{
            name: "",
            cpf: "",
            birthday: "",
            email: "",
            paswword: "",
            confirmPassword: "",
            projectos: [{ title: "", url: "" }],
          }}
          validationSchema={shema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className={Styles.form} onSubmit={handleSubmit}>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Nome"
                value={values.name}
                errorMsg={errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="cpf"
                id="cpf"
                type="text"
                placeholder="CPF"
                value={StringFormat.formatCPF(values.cpf)}
                errorMsg={errors.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="birthday"
                id="birthday"
                type="date"
                placeholder="Data de nascimento"
                value={values.birthday}
                errorMsg={errors.birthday}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="email"
                id="email"
                type="mail"
                placeholder="E-mail"
                value={values.email}
                errorMsg={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="paswword"
                id="paswword"
                type="password"
                placeholder="Senha"
                value={values.paswword}
                errorMsg={errors.paswword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Confirmação de senha"
                value={values.confirmPassword}
                errorMsg={errors.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <FieldArray
                name="projectos"
                render={(arrayProjectos) => (
                  <>
                    <div className={Styles.titleProjects}>
                      <h3 className={Styles.subtitle}>Meus projetos </h3>
                      <Button
                        kind="without"
                        title="+"
                        type="button"
                        clique={() => arrayProjectos.push("")}
                      />
                    </div>
                    <div className={Styles.containerProjects}>
                      {values.projectos.map((projecto, index) => (
                        <div className={Styles.item} key={index}>
                          <span
                            onClick={() => arrayProjectos.remove(index)}
                            className={Styles.remove}
                          >
                            Apagar
                          </span>
                          <Input
                            name={`projectos.${index}.title`}
                            id={`projectos.${index}.title`}
                            type="text"
                            placeholder="Titulo"
                            value={projecto.title}
                            errorMsg={getIn(errors, `projectos.${index}.title`)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Input
                            name={`projectos.${index}.url`}
                            id={`projectos.${index}.url`}
                            type="text"
                            placeholder="URL"
                            value={projecto.url}
                            errorMsg={getIn(errors, `projectos.${index}.url`)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              />

              <Button
                title="Salvar"
                type="submit"
                clique={() => console.log("teste")}
              />
            </form>
          )}
        </Formik>
      </div>

      <Link href="/" className={Styles.back}>
        Voltar
      </Link>
    </>
  );
};

export default FormRegister;
