import { useCallback, useState } from "react";
import { TableComponent } from "../../components/TableComponent";
import { Form, message } from "antd";
import {
  addUserMutation,
  copyUserMutation,
  deleteUserMutation,
  getUsersQuery,
} from "./api";
import { UserType } from "../../shared/userSchema";
import { useUnit } from "effector-react";
import { AddUserModal } from "../../features/addUser";

export const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: users, error } = useUnit(getUsersQuery);

  console.log({ users });
  console.log({ error });

  const [form] = Form.useForm<UserType>();

  const showModal = useCallback(() => setIsModalOpen(true), []);

  const handleAdd = useCallback(
    (values: UserType) => {
      try {
        const newUser: Omit<UserType, "id"> = {
          ...values,
        };

        console.log(newUser);
        addUserMutation.start(newUser);
        form.resetFields();
        setIsModalOpen(false);
        message.success("Пользователь успешно добавлен!");
      } catch {
        message.error("Ошибка при добавлении пользователя!");
      }
    },
    [form]
  );

  const handleDelete = useCallback((id: number) => {
    try {
      console.log(`id ${id}`);
      deleteUserMutation.start(id);
      message.success("Пользователь успешно удален!");
    } catch {
      message.error("Ошибка при удалении пользователя!");
    }
  }, []);

  const handleCopy = useCallback(
    (id: number) => {
      const userToCopy = users?.find((user) => user.id === id);

      if (userToCopy) {
        try {
          const copiedUser = {
            ...userToCopy,
          };

          console.log(copiedUser);
          copyUserMutation.start(copiedUser);
          message.success("Копия пользователя создана!");
        } catch {
          message.error("Ошибка при создании копии пользователя!");
        }
      } else {
        message.error("Пользователь не найден!");
      }
    },
    [users]
  );

  const handleCancel = useCallback(() => {
    form.resetFields();
    setIsModalOpen(false);
  }, [form]);

  return (
    <>
      <TableComponent
        dataSource={users ?? []}
        onShowModal={showModal}
        onDelete={handleDelete}
        onCopy={handleCopy}
      />
      <AddUserModal
        form={form}
        onAdd={handleAdd}
        onClose={handleCancel}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
