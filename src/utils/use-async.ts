import { useState } from "react";
// import { useMountedRef } from "utils/index";

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

// const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
//   const mountedRef = useMountedRef();
//   return useCallback(
//     (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
//     [dispatch, mountedRef]
//   );
// };

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = {...defaultConfig, initialConfig}
  const [state, setState] = useState<State<D>>(
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  // const safeDispatch = useSafeDispatch(dispatch);
  // // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
  // // https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
  // const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) => setState(
    {
      data,
      stat: "success",
      error: null,
    }
  );

  const setError = (error: Error) => setState(
    {
      error,
      stat: "error",
      data: null,
    }
  );

  // run 用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }

    setState({...state, stat: 'loading'})
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        // catch会消化异常，如果不主动抛出，外面是接收不到异常的
        setError(error);
        if(config.throwOnError) return Promise.reject(error)
        return Promise.reject(error);
      });
  }

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};