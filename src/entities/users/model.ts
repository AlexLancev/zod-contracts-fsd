import { getUsersQuery } from "./api";

getUsersQuery.$status.watch((state) => state);
