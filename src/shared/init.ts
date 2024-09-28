import { createEvent, sample } from "effector";
import {
  addUserMutation,
  copyUserMutation,
  deleteUserMutation,
  getUsersQuery,
} from "../entities/users/api";

// Событие для инициализации приложения
export const initApp = createEvent();

// Запуск запроса для получения пользователей при инициализации приложения
sample({
  clock: initApp,
  target: getUsersQuery.start,
});

// Определяем переменные для упрощения доступа
const usersData = getUsersQuery.$data;
const startUsersQuery = getUsersQuery.start;

// Обновление списка пользователей при успешном добавлении нового пользователя
sample({
  source: usersData, // Хранилище данных пользователей
  clock: addUserMutation.finished.success, // Успешное добавление пользователя
  fn: (state, user) => {
    return state ? [...state, user] : [user]; // Добавляем пользователя
  },
  target: startUsersQuery, // Запускаем повторный запрос
});

// Обновление списка пользователей при успешном копировании пользователя
sample({
  source: usersData,
  clock: copyUserMutation.finished.success, // Успешное копирование пользователя
  fn: (state, user) => {
    return state ? [...state, user] : [user]; // Добавляем пользователя
  },
  target: startUsersQuery,
});

// Обновление списка пользователей при успешном удалении пользователя
sample({
  source: usersData,
  clock: deleteUserMutation.finished.success, // Успешное удаление пользователя
  fn: (state, { params }) => {
    return state ? state.filter((user) => user.id !== params) : state; // Фильтруем пользователей
  },
  target: startUsersQuery,
});
