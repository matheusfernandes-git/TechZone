import { useLocation } from "react-router-dom";
import TitleWithImg from "./TitleWithImg";
import TitleWithoutImg from "./TitleWithoutImg";
import styles from "./header.module.scss";

export default function Header({
  title,
  describe,
  className = "",
  img,
  children,
}) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={isHome ? styles.headerHome : styles.header}>
      {title && !img && (
        <TitleWithoutImg title={title} describe={describe}>
          {children}
        </TitleWithoutImg>
      )}
      {title && img && (
        <TitleWithImg
          title={title}
          describe={describe}
          img={img}
          className={className}
          isHomePage={isHome}
        >
          {children}
        </TitleWithImg>
      )}
    </header>
  );
}
