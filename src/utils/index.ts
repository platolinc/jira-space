import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value  

//在一个函数里,改变传入的对象本身是不好的
export const clean0bject = (object: object) => {
  const result = { ...object }
  
  Object.keys(result).forEach(key => {
    // @ts-ignore：之后会解决这里的ts错误
    const value = result[key]
    if (isFalsy(value)) { 
      // @ts-ignore：之后会解决这里的ts错误
      delete result[key] 
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
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
}
  