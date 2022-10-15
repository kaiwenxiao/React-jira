import React from "react";
import { User } from "./search-panel";
import { Dropdown, Menu, Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal } from "./util";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  // list: Project[]; -- 不需要定义list，这里的list对应TableProps源码中的dataSource
  users: User[];
}

type PropsType = Omit<ListProps, "users">; // antd Table 的props 类型
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const { startEdit, open } = useProjectModal();
  // 2.
  // const pinProject = (id: number, pin: boolean) => mutate({ id, pin });

  // 3.
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                // onCheckedChange={(pin) => {
                //   //  1.
                //   // mutate({ id: project.id, pin });
                //   //  2.
                //   // pinProject(project.id, pin);
                // }}

                //3.
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"} onClick={editProject(project.id)}>
                      编辑
                    </Menu.Item>
                    <Menu.Item key={"delete"} onClick={open}>
                      删除
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
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
