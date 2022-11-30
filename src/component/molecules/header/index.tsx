import Logo from "public/images/front-academy-logo.png";
import Image from "next/image";
import Styles from "./styles.module.scss";

export const Header = () => {
  return (
    <div className={Styles.container}>
      <Image src={Logo} alt="logo" width="355" />
    </div>
  );
};
