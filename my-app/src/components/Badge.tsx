import React from "react";
import styles from "./Badge.module.css";

export interface BadgeProps{
  name: string,
  color: string,
}

function Badge({ name, color }: BadgeProps) {
  return (
    <span className={styles.badge} style={{ background: `#${color}` }}>
      {name}
    </span>
  );
}

export default Badge;
