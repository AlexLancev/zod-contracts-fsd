import { zodContract } from "@farfetched/zod";
import { z } from "zod";

// Общие схемы
const PositiveInt = z.number().int().positive(); // Положительное целое число
const NonEmptyString = z.string().min(1); // Непустая строка
const AddressSchema = NonEmptyString.max(100); // Адрес с ограничением по длине

// Схема пользователя
const UserSchema = z.object({
  id: z.number(), // Идентификатор пользователя
  name: NonEmptyString, // Имя пользователя
  age: PositiveInt, // Возраст пользователя
  address: AddressSchema, // Адрес пользователя
});

// Схема для удаления пользователя (только null)
const DeleteUserSchema = z.null();

// Контракты
export const UserSchemaContract = zodContract(UserSchema.omit({ id: true })); // Контракт без поля id
export const UserSchemaDeleteContract = zodContract(DeleteUserSchema); // Контракт для удаления
export const UserContract = zodContract(UserSchema); // Контракт для пользователя
export const UserSchemaArrayContract = zodContract(z.array(UserSchema)); // Контракт для массива пользователей

// Тип пользователя
export type UserType = z.infer<typeof UserSchema>; // Тип, выведенный из схемы пользователя

