import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  // list: Project[]; -- 不需要定义list，这里的list对应TableProps源码中的dataSource
  users: User[];
}

type PropsType = Omit<ListProps, "users">; // antd Table 的props 类型
export const List = ({ users, ...props }: ListProps) => {
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
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return <span>{users.find((user) => user.id === project.personId)?.name}</span>;
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>{project.created ? dayjs(project.created).format("YYYY-MM-DD") : "无"}</span>
            );
          },
        },
      ]}
      {...props}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.name}>
  //           <td>{project.name}</td>
  //           <td>{users.find((user) => user.id === project.personId)?.name}</td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
