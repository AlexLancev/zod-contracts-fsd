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

export const getUsersQuery = createJsonQuery({
  request: {
    method: "GET",
    url: "/api/users",
  },
  response: {
    contract: UserSchemaArrayContract,
  },
});

getUsersQuery.finished.failure.watch(({ error }) => {
  console.error("Ошибка при получении пользователей:", error);
});

export const deleteUserMutation = createJsonMutation({
  params: declareParams<number>(),
  request: {
    method: "DELETE",
    url: (id) => `/api/users/${id}`,
  },
  response: {
    contract: UserSchemaDeleteContract,
  },
});

deleteUserMutation.finished.failure.watch(({ error }) => {
  console.error("Ошибка при удалении пользователя:", error);
});

export const addUserMutation = createJsonMutation({
  params: declareParams<Omit<UserType, "id">>(),
  request: {
    method: "POST",
    url: "/api/users",
    body: (userData) => userData,
  },
  response: {
    contract: UserSchemaContract,
  },
});

addUserMutation.finished.failure.watch(({ error }) => {
  console.error("Ошибка при добавлении пользователя:", error);
});

export const copyUserMutation = createJsonMutation({
  params: declareParams<Omit<UserType, "id">>(),
  request: {
    method: "POST",
    url: "/api/users",
    body: (userData) => userData,
  },
  response: {
    contract: UserSchemaContract,
  },
});

copyUserMutation.finished.failure.watch(({ error }) => {
  console.error("Ошибка при копировании пользователя:", error);
});
