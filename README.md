# Task Manager

Приложение для управления списками задач.

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на http://localhost:3000.

## Скрипты

| Команда                   | Что делает                         |
| ------------------------- | ---------------------------------- |
| `npm run dev`             | Dev-сервер                         |
| `npm run build`           | Production-сборка                  |
| `npm run lint`            | ESLint                             |
| `npm run typecheck`       | Проверка типов                     |
| `npm run format`          | Форматирование Prettier            |
| `npm run format:check`    | Проверка форматирования            |
| `npm test`                | Юнит-тесты (Vitest)                |
| `npm run test:watch`      | Юнит-тесты в watch-режиме          |
| `npm run test:coverage`   | Юнит-тесты с отчётом о покрытии    |
| `npm run storybook`       | Storybook на http://localhost:6006 |
| `npm run build-storybook` | Статическая сборка Storybook       |
| `npm run test:storybook`  | Тесты историй (Vitest, Chromium)   |

Перед первым запуском `test:storybook` нужно скачать браузер: `npx playwright install chromium`.
