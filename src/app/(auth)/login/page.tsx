import type { Metadata } from "next";

import { LoginFormContainer } from "@/features/auth/login-form/LoginFormContainer";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Вход — Task Manager",
};

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="login-title">
        <h1 id="login-title" className={styles.title}>
          Вход в Task Manager
        </h1>

        <LoginFormContainer />

        <p className={styles.hint}>
          Демо-доступ: admin@example.com / Admin123!
        </p>
      </section>
    </main>
  );
}
