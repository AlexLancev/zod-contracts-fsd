import {
  createJsonMutation,
  createJsonQuery,
  declareParams,
} from "@farfetched/core";
import {
  UserType,
  UserSchemaArrayContract,
  UserSchemaContract,
  UserSchemaDeleteContract,
} from "../../shared/userSchema";

// Запрос для получения пользователей
export const getUsersQuery = createJsonQuery({
  request: {
    method: "GET",
    url: "/api/users",
  },
  response: {
    contract: UserSchemaArrayContract, // Контракт для массива пользователей
  },
});

// Обработка ошибок запроса
getUsersQuery.finished.failure.watch(({ error }) => {
  console.error("Ошибка при получении пользователей:", error);
});

// Запрос для удаления пользователя
export const deleteUserMutation = createJsonMutation({
  params: declareParams<number>(), // Параметр: ID пользователя
  request: {
    method: "DELETE",
    url: (id) => `/api/users/${id}`, // URL для удаления пользователя
  },
  response: {
    contract: UserSchemaDeleteContract, // Контракт для удаления
  },
});

// Обработка ошибок удаления
deleteUserMutation.finished.failure.watch(({ error }) => {
  console.error("Ошибка при удалении пользователя:", error);
});

// Запрос для добавления пользователя
export const addUserMutation = createJsonMutation({
  params: declareParams<Omit<UserType, "id">>(), // Параметры без ID
  request: {
    method: "POST",
    url: "/api/users",
    body: (userData) => userData, // Тело запроса с данными пользователя
  },
  response: {
    contract: UserSchemaContract, // Контракт для добавленного пользователя
  },
});

// Обработка ошибок добавления
addUserMutation.finished.failure.watch(({ error }) => {
  console.error("Ошибка при добавлении пользователя:", error);
});

// Запрос для копирования пользователя
export const copyUserMutation = createJsonMutation({
  params: declareParams<Omit<UserType, "id">>(), // Параметры без ID
  request: {
    method: "POST",
    url: "/api/users",
    body: (userData) => userData, // Тело запроса с данными пользователя
  },
  response: {
    contract: UserSchemaContract, // Контракт для скопированного пользователя
  },
});

// Обработка ошибок копирования
copyUserMutation.finished.failure.watch(({ error }) => {
  console.error("Ошибка при копировании пользователя:", error);
});
