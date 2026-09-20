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

type PageTitleProps = {
  children: ReactNode;
};

export function PageTitle({ children }: PageTitleProps) {
  return <h1 className={styles.title}>{children}</h1>;
}
