import { useEffect, useRef } from "react";
import { useState } from "react";

// 0在业务上是一个真值，而不是js的假值(一个！为求反，两个为求boolean 0的boolean为false) !undefined === true -- !!0 === false
export const isFalsy = (value: unknown): boolean => (value === 0 ? false : !value);

// value 为false时也是有意义的，而不是isFalsy
export const isVoid = (value: unknown) => value === undefined || value === null || value === "";

// 在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 使用到这个自定义hook的地方是useEffect的依赖值，所以要用响应式数据useState
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // 3. a.tsx -> b.tsx 切换页面的过程中，保留a页面的文档名称（第二个useEffect加空依赖的话，这里可以不用useRef -- 好好理解下
  // useEffect return 里面读的值比如oldTitle都是外面的初始值，
  // 比如你先引用了oldTitle，但是不管你后面调用多少次useDocumentTitle，还是第一次读的值，js闭包问题）
  const oldTitle = useRef(document.title).current;
  // 1. a.tsx -> b.tsx （两个页面都使用了useDocumentTitle，
  // 且有不同的标题名称，这个useEffect就做到切换文档标题名称的作用）
  useEffect(() => {
    document.title = title;
  }, [title]);

  // 2. a.tsx -> b.tsx 切换页面的过程中，如果新的页面keepOnUmount变化，比如从true -> false，
  // 那么就是要b页面保留a页面的标题，卸载a页面的时候执行这个useEffect。正常来说这里的oldTitle依赖是不会变化的（理解对吗？）
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/*
  用来返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
