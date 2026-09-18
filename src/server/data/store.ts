import "server-only";

import type { TaskList } from "@/domain/list/types";
import type { Task, TaskStatus } from "@/domain/task/types";

type Store = {
  lists: TaskList[];
  tasks: Task[];
};

const HOUR = 60 * 60 * 1000;

function createSeedStore(): Store {
  const now = Date.now();

  const task = (
    id: string,
    listId: string,
    title: string,
    status: TaskStatus,
    hoursUntilDeadline: number,
  ): Task => ({
    id,
    listId,
    title,
    status,
    deadline: new Date(now + hoursUntilDeadline * HOUR).toISOString(),
  });

  return {
    lists: [
      { id: "release", title: "Релиз 2.4" },
      { id: "onboarding", title: "Онбординг новых сотрудников" },
      { id: "marketing", title: "Маркетинг: осенняя кампания" },
      { id: "personal", title: "Личное" },
    ],
    tasks: [
      task(
        "t1",
        "release",
        "Исправить падение при экспорте",
        "in_progress",
        -20,
      ),
      task("t2", "release", "Обновить changelog", "new", 30),
      task("t3", "release", "Прогнать регресс", "new", 40),
      task("t4", "release", "Согласовать дату выпуска", "done", -48),
      task("t5", "onboarding", "Подготовить доступы", "done", -72),
      task("t6", "onboarding", "Провести вводную встречу", "in_progress", 20),
      task("t7", "onboarding", "Назначить наставников", "new", 120),
      task("t8", "marketing", "Собрать бриф для дизайнеров", "done", -24),
      task("t9", "marketing", "Запустить рассылку", "new", 200),
      task("t10", "marketing", "Отчёт по охвату", "new", 300),
    ],
  };
}

const globalForStore = globalThis as typeof globalThis & {
  taskManagerStore?: Store;
};

// Одно хранилище на серверный процесс: страницы и API-обработчики собираются
// в разные бандлы, и обычная переменная модуля могла бы оказаться у каждого своей.
export const store = (globalForStore.taskManagerStore ??= createSeedStore());
