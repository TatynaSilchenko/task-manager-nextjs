import { SessionWatcher } from "@/features/auth/session-watcher/SessionWatcher";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SessionWatcher />
      {children}
    </>
  );
}
