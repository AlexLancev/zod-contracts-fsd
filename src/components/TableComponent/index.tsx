import React from "react";
import { Table, Button, Space } from "antd";
import { UserType } from "../../shared/userSchema";

interface TableComponentProps {
  dataSource: UserType[];
  onShowModal: () => void;
  onDelete: (id: number) => void;
  onCopy: (id: number) => void;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  dataSource,
  onShowModal,
  onDelete,
  onCopy,
}) => {
  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      id: "name",
    },
    {
      title: "Возраст",
      dataIndex: "age",
      id: "age",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      id: "address",
    },
    {
      title: "Действие",
      id: "action",
      render: (_: unknown, record: UserType) => (
        <Space>
          <Button type="primary" onClick={() => onDelete(record.id)} danger>
            Удалить
          </Button>
          <Button type="primary" onClick={() => onCopy(record.id)}>
            Копировать
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={onShowModal}>
        Добавить пользователя
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </>
  );
};
