import { useSetUrlSearchParam, useUrlQueryParam } from "../../utils/url";
import { useMemo, useState } from "react";
import { useProject } from "../../utils/project";
import { useSearchParams } from "react-router-dom";

export const useProjectSearchParams = () => {
  // 通过URL的query来管理输入框的值
  const [keys] = useState<["name", "personId"]>(["name", "personId"]);
  // const [keys] = useState<('name' | 'personId')[]>(["name", "personId"]); 一样的
  const [param, setParam] = useUrlQueryParam(keys);
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam,
  ] as const;
};

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};

// 可以取代context和redux
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(["projectCreate"]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(["editingProjectId"]);
  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId));

  const open = () => setProjectCreate({ projectCreate: true });
  // false 改为undefined 防止false的时候url展示false -- url 会自动转为string
  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };

  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });

  // 3个及以下可以用数组
  // return [projectCreate === "true", open, close] as const;
  // 3个以上返回可以用对象
  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
