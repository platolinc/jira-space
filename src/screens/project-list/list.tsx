import { Table } from "antd";
import { User } from "screens/project-list/search-panel";

interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[]
  users: User[]
}

export const List = ({users, list}: ListProps) => {
  
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
      rowKey="id"
    />
  )
}