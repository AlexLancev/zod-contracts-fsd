import { createEvent, sample } from "effector";
import {
  addUserMutation,
  copyUserMutation,
  deleteUserMutation,
  getUsersQuery,
} from "../entities/users/api";

export const initApp = createEvent();

const usersData = getUsersQuery.$data;
const startUsersQuery = getUsersQuery.start;

sample({
  clock: initApp,
  target: startUsersQuery,
});

sample({
  source: usersData,
  clock: addUserMutation.finished.success,
  fn: (state, user) => {
    return state ? [...state, user] : [user];
  },
  target: startUsersQuery,
});

sample({
  source: usersData,
  clock: copyUserMutation.finished.success,
  fn: (state, user) => {
    return state ? [...state, user] : [user];
  },
  target: startUsersQuery,
});

sample({
  source: usersData,
  clock: deleteUserMutation.finished.success,
  fn: (state, { params }) => {
    return state ? state.filter((user) => user.id !== params) : state;
  },
  target: startUsersQuery,
});
