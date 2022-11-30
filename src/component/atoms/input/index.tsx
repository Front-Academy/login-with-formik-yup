import { ChangeEventHandler } from "react";
import Styles from "./styles.module.scss";

interface Props {
  placeholder: string;
  value: string;
  type: string;
  id: string;
  name: string;
  errorMsg?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export const Input = ({
  placeholder,
  type,
  errorMsg,
  value,
  onChange,
  onBlur,
  id,
  name,
}: Props) => {
  return (
    <>
      <input
        autoComplete="off"
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        type={type}
        className={`${Styles.Input} ${errorMsg && Styles.errorInput}`}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMsg && <span className={Styles.errorMensage}>{errorMsg}</span>}
    </>
  );
};
