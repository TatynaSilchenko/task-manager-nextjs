"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./BackLink.module.css";

type BackLinkProps = {
  href: string;
  children: ReactNode;
};

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link href={href} className={styles.link}>
      <ArrowLeftOutlined aria-hidden />
      {children}
    </Link>
  );
}
