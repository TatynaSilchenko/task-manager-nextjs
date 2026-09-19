import type { ReactNode } from "react";

import styles from "./PageLayout.module.css";

type PageLayoutProps = {
  width?: "wide" | "narrow";
  children: ReactNode;
};

export function PageLayout({ width = "wide", children }: PageLayoutProps) {
  return (
    <main className={styles.page}>
      <div className={styles.content} data-width={width}>
        {children}
      </div>
    </main>
  );
}

type PageTitleProps = {
  children: ReactNode;
};

export function PageTitle({ children }: PageTitleProps) {
  return <h1 className={styles.title}>{children}</h1>;
}
