"use client";

import { default as NextLink } from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";

type Props = {
  href: string;
  label: string;
};

export default function Link({ href, label }: Props) {
  const pathname = usePathname();

  return (
    <li>
      <NextLink className={pathname === href ? styles.active : ""} href={href}>
        {label}
      </NextLink>
    </li>
  );
}
