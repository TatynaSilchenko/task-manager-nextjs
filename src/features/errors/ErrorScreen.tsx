"use client";

import { Button } from "antd";

import styles from "./ErrorScreen.module.css";

type ErrorScreenProps = {
  title: string;
  description: string;
  onRetry?: () => void;
};

export function ErrorScreen({ title, description, onRetry }: ErrorScreenProps) {
  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          {onRetry && <Button onClick={onRetry}>Попробовать снова</Button>}
          <Button type="primary" href="/lists">
            К спискам задач
          </Button>
        </div>
      </section>
    </main>
  );
}
