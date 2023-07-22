import { forwardRef } from "react";
import styles from "./Input.module.scss";

function Input(props, ref) {
  const { value, onChange, error, onFocus, type, label, ...othersProps } =
    props;
  const hasError = error && error.type;
  const inputClassName = `${styles.input} ${hasError && styles["input-erro"]} ${
    props.inputclass
  } ${props.paymentinputs}  ${props.cardinputs}`;

  return (
    <input
      type={type}
      ref={ref}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      {...othersProps}
      className={inputClassName}
    />
  );
}

export default forwardRef(Input);
