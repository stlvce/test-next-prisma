import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

export default function CarForm({ children }: PropsWithChildren) {
  return <div className={styles.form}>{children}</div>;
}
