import Styles from "./styles.module.scss";

interface Props {
  title: string;
  clique: () => void;
  kind?: "primary" | "secundary" | "without";
  type?: "button" | "submit";
}

export const Button = ({
  title,
  clique,
  kind = "primary",
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      onClick={clique}
      className={`${Styles.button} ${Styles[kind]}`}
    >
      {title}
    </button>
  );
};
