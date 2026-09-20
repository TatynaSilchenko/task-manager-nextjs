import type { Metadata } from "next";

import { LoginFormContainer } from "@/features/auth/login-form/LoginFormContainer";
import { safeRedirectPath } from "@/shared/lib/auth";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Вход — Task Manager",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;

  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="login-title">
        <h1 id="login-title" className={styles.title}>
          Вход в Task Manager
        </h1>

        <LoginFormContainer redirectTo={safeRedirectPath(next)} />

        <p className={styles.hint}>
          Демо-доступ: admin@example.com / Admin123!
        </p>
      </section>
    </main>
  );
}
