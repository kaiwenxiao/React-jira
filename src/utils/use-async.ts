import { useCallback, useState } from "react";
import { useMountedRef } from "./index";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const mountedRef = useMountedRef();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        stat: "error",
        data: null,
      }),
    []
  );

  // run 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) run(runConfig?.retry(), runConfig);
      });
      // useCallback直接依赖state会发生无限循环，使用setState函数式写法 10.1
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          //防止页面还在请求过程中，切换页面，页面卸载后，promise.then结果无处接收的问题
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          // catch 会消化异常，如果不主动出，外面是接抛受不到的
          // return error;
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // retry 被调用时重新跑一遍run，让state刷新一遍
    retry,
    ...state,
  };
};
