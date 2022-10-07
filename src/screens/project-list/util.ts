import { useUrlQueryParam } from "../../utils/url";
import { useMemo, useState } from "react";

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
