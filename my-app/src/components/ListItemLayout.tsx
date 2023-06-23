import cx from "clsx";
import styles from "./ListItemLayout.module.css";

interface Props{
  checked ?: boolean, 
  onClick ?: (e: React.ChangeEvent<HTMLInputElement>)=> void, 
  children: React.ReactNode, 
  className ?: string,
  style ?: React.CSSProperties,
}

export default function ListItemLayout({
  checked, 
  onClick, 
  children, 
  className,
  style
}: Props) {
  return (
    <div className={cx(styles.wrapper, className)} style={style}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={onClick}
      />

      {children}
    </div>
  );
}
