import { zodContract } from "@farfetched/zod";
import { z } from "zod";

const PositiveInt = z.number().int().positive();
const NonEmptyString = z.string().min(1);
const AddressSchema = NonEmptyString.max(100);

const UserSchema = z.object({
  id: z.number(),
  name: NonEmptyString,
  age: PositiveInt,
  address: AddressSchema,
});

const DeleteUserSchema = z.null();

export const UserSchemaContract = zodContract(UserSchema.omit({ id: true }));
export const UserSchemaDeleteContract = zodContract(DeleteUserSchema);
export const UserContract = zodContract(UserSchema);
export const UserSchemaArrayContract = zodContract(z.array(UserSchema));

export type UserType = z.infer<typeof UserSchema>;
