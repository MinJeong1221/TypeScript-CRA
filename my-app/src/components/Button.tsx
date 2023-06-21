import React from "react";
import styles from "./Button.module.css";

// type Props = {
//   style: React.CSSProperties,
//   children:React.ReactDOM,
//   type : 'button'| 'submit',
//   disabled : boolean
// }

interface Props{
  style: React.CSSProperties,
  children:React.ReactNode,
  type ?: 'button'| 'submit',
  disabled ?: boolean
}

// type과 interface의 차이점
// interface는 동일한 인터페이스를 사용가능(선언이후 확장가능) 
//             extends키워드 사용가능

function Button({ style,children, type = "button", disabled, }:
  Props) {
  return (
    <button
      className={styles.button}
      style={style}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
