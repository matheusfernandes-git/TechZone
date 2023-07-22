import styles from "./TitleWithImg.module.scss";

export default function TitleWithImg({
  title,
  describe,
  className,
  img,
  children,
  isHomePage,
}) {
  return (
    <div
      className={`${className} ${styles.header} ${
        isHomePage && styles.homeHeader
      }`}
    >
      <div className={styles["header-texto"]}>
        <h1>{title}</h1>
        <h2>{describe}</h2>
        {children}
      </div>
      <div className={styles["header-imagem"]}>
        <img alt={title} src={img} />
      </div>
    </div>
  );
}
