import Styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={Styles.container}>
      <a
        href="https://frontacademy.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className={Styles.title}
      >
        FRONTACADEMY
      </a>
    </footer>
  );
};
