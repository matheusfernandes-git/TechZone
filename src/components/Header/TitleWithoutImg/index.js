import styles from "./TitleWithoutImage.module.scss";

export default function TitleWithoutImg({ title, describe, children }) {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.titulo}>{title}</h1>
        <h2 className={styles.descricao}>{describe}</h2>
        {children}
      </div>
    </>
  );
}
