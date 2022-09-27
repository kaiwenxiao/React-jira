import { List } from "./list";
import { SearchPanel } from "./search-panel";
import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce } from "utils";
import * as qs from "qs";
import { useMount } from "./../../utils/index";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 2000);

  // 当param改变时，去调用接口
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debounceParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
