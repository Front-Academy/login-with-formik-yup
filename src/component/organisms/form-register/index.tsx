import { FieldArray, Formik, getIn } from "formik";
import * as Yup from "yup";

import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import Styles from "./styles.module.scss";
import { StringFormat } from "../../../utils/StringFormat";
import Link from "next/link";

const schema = Yup.object().shape({
  nome: Yup.string().required("Nome é um campo obrigatório!"),
  cpf: Yup.string()
    .matches(/([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})(.*)/, "CPF inválido!")
    .required("CPF é um campo obrigatório!"),
  nascimento: Yup.date().required("Data de nascimento é obrigatório!"),
  email: Yup.string().email("Email inválido!").required("Email é obrigatório!"),
  senha: Yup.string().required("Senha é obrigatória!"),
  confirmSenha: Yup.string()
    .oneOf([Yup.ref("senha"), null], "As senhas devem ser iguais!")
    .required("Confirmação de senha é obrigatória!"),
  projetos: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Titulo é obrigatório!"),
      url: Yup.string().required("URL é obrigatório!"),
    })
  ),
});

const FormRegister = () => {
  return (
    <>
      <div className={Styles.container}>
        <Formik
          initialValues={{
            nome: "",
            cpf: "",
            nascimento: "",
            email: "",
            senha: "",
            confirmSenha: "",
            projetos: [
              {
                title: "",
                url: "",
              },
            ],
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={schema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form
              className={Styles.form}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Input
                name="nome"
                id="nome"
                type="text"
                placeholder="Nome"
                value={values.nome}
                errorMsg={errors.nome}
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
                name="nascimento"
                id="nascimento"
                type="date"
                placeholder="Data de nascimento"
                value={values.nascimento}
                errorMsg={errors.nascimento}
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
                name="senha"
                id="senha"
                type="password"
                placeholder="Senha"
                value={values.senha}
                errorMsg={errors.senha}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="confirmSenha"
                id="confirmSenha"
                type="password"
                placeholder="Confirmação de senha"
                value={values.confirmSenha}
                errorMsg={errors.confirmSenha}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <FieldArray
                name="projetos"
                render={(arrayProjects) => (
                  <>
                    <div className={Styles.titleProjects}>
                      <h3 className={Styles.subtitle}>Meus projetos </h3>
                      <Button
                        kind="without"
                        title="+"
                        type="button"
                        clique={() => arrayProjects.push("")}
                      />
                    </div>
                    <div className={Styles.containerProjects}>
                      {values.projetos.map((projeto, index) => (
                        <div className={Styles.item} key={index}>
                          <span
                            onClick={() => arrayProjects.remove(index)}
                            className={Styles.remove}
                          >
                            Apagar
                          </span>
                          <Input
                            name={`projetos.${index}.title`}
                            id={`projetos.${index}.title`}
                            type="text"
                            placeholder="Titulo"
                            value={projeto.title}
                            errorMsg={getIn(errors, `projetos.${index}.title`)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Input
                            name={`projetos.${index}.url`}
                            id={`projetos.${index}.url`}
                            type="text"
                            placeholder="URL"
                            value={projeto.url}
                            errorMsg={getIn(errors, `projetos.${index}.url`)}
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
