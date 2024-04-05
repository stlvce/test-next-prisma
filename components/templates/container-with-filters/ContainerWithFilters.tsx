import { ReactNode, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

type Props = {
  filterComponent: ReactNode;
};

export default function ContainerWithFilters({
  filterComponent,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className={styles.searchPage}>
      {filterComponent}
      <div className={styles.container}>{children}</div>
    </div>
  );
}
