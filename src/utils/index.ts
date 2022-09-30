// 0在业务上是一个真值，而不是js的假值(一个！为求反，两个为求反后的boolean) !undefined === true -- !!0 === false
import { useEffect } from "react";
import { useState } from "react";
export const isFalsy = (value: unknown): boolean => (value === 0 ? false : !value);

// 在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
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
