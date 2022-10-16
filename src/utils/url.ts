/**
 * 返回页面url中，指定键的参数值
 */
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";
import { URLSearchParamsInit } from "react-router-dom/dist/dom";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          // {abc: ''} === null
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams, keys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      //   const o = cleanObject({
      //     ...Object.fromEntries(searchParams),
      //     ...params,
      //   }) as URLSearchParamsInit;
      //   return setSearchParam(o);
      // },
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: Partial<{ [key in string]: unknown }>) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};

const a = ["jack", 12, { gender: "male" }];
// const a: (string | number | { gender: string; })[]
const b = ["jack", 12, { gender: "male" }] as const;
// const b: readonly ["jack", 12, { readonly gender: "male"; }]
