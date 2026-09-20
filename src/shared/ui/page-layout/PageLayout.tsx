import type { ReactNode } from "react";

import styles from "./PageLayout.module.css";

type PageLayoutProps = {
  width?: "wide" | "narrow";
  back?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
};

export function PageLayout({
  width = "wide",
  back,
  aside,
  children,
}: PageLayoutProps) {
  return (
    <main className={styles.page}>
      <div className={styles.content} data-width={width}>
        {(back || aside) && (
          <div className={styles.topBar}>
            {back}
            {aside && <div className={styles.aside}>{aside}</div>}
          </div>
        )}
        {children}
      </div>
    </main>
  );
}

type PageHeaderProps = {
  title: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  );
}
