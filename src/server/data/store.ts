import "server-only";

import type { TaskList } from "@/domain/types/list";
import type { Task } from "@/domain/types/task";

type Store = {
  lists: TaskList[];
  tasks: Task[];
};

const HOUR = 60 * 60 * 1000;

type SeedTask = Pick<
  Task,
  "id" | "listId" | "title" | "status" | "priority"
> & {
  description?: string;
  hoursUntilDeadline: number;
};

function createSeedStore(): Store {
  const now = Date.now();

  const task = ({
    hoursUntilDeadline,
    description = "",
    ...rest
  }: SeedTask): Task => ({
    ...rest,
    description,
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
      task({
        id: "t1",
        listId: "release",
        title: "Исправить падение при экспорте",
        description:
          "Экспорт в CSV падает на списках больше 500 задач. Воспроизводится на стенде.",
        status: "in_progress",
        priority: "high",
        hoursUntilDeadline: -20,
      }),
      task({
        id: "t2",
        listId: "release",
        title: "Обновить changelog",
        status: "new",
        priority: "low",
        hoursUntilDeadline: 30,
      }),
      task({
        id: "t3",
        listId: "release",
        title: "Прогнать регресс",
        description: "Полный прогон по чек-листу релиза, результаты — в отчёт.",
        status: "new",
        priority: "high",
        hoursUntilDeadline: 30,
      }),
      task({
        id: "t4",
        listId: "release",
        title: "Согласовать дату выпуска",
        status: "done",
        priority: "medium",
        hoursUntilDeadline: -48,
      }),
      task({
        id: "t5",
        listId: "onboarding",
        title: "Подготовить доступы",
        status: "done",
        priority: "high",
        hoursUntilDeadline: -72,
      }),
      task({
        id: "t6",
        listId: "onboarding",
        title: "Провести вводную встречу",
        description: "Рассказать о процессах, познакомить с командой.",
        status: "in_progress",
        priority: "medium",
        hoursUntilDeadline: 20,
      }),
      task({
        id: "t7",
        listId: "onboarding",
        title: "Назначить наставников",
        status: "new",
        priority: "low",
        hoursUntilDeadline: 120,
      }),
      task({
        id: "t8",
        listId: "marketing",
        title: "Собрать бриф для дизайнеров",
        status: "done",
        priority: "medium",
        hoursUntilDeadline: -24,
      }),
      task({
        id: "t9",
        listId: "marketing",
        title: "Запустить рассылку",
        status: "new",
        priority: "high",
        hoursUntilDeadline: 200,
      }),
      task({
        id: "t10",
        listId: "marketing",
        title: "Отчёт по охвату",
        status: "new",
        priority: "low",
        hoursUntilDeadline: 300,
      }),
    ],
  };
}

const globalForStore = globalThis as typeof globalThis & {
  taskManagerStore?: Store;
};

export const store = (globalForStore.taskManagerStore ??= createSeedStore());
