import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value  

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

//在一个函数里,改变传入的对象本身是不好的
export const cleanObject = (object: { [key:string]: unknown }) => {
  const result = { ...object }
  
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) { 
      delete result[key] 
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// const debounce = (func, delay) => {
//   let timeout;
//   return ()=> {
//     if ( timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout( function() {
//       func();
//     }, delay);
//   }
// }

// const log = debounce(() =>console.log( 'call'),5000)

// log()
// log()
// log()

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)  // value每次变化之后都设置一个定时器
    return ()=> clearTimeout(timeout);  // 每次在上一个useEffect处理完以后再运行
  }, [value, delay])

  return debouncedValue
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  // 退出页面时是否恢复默认
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
  
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
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