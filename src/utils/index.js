import { useEffect, useState } from "react"

export const isFalsy = (value) => value === 0 ? false : !value  

//在一个函数里,改变传入的对象本身是不好的
export const clean0bject = (object) => {
  const result = { ...object }
  
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) { 
      delete result[key] 
    }
  })
  return result
}

export const useMount = (callback) => {
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

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)  // value每次变化之后都设置一个定时器
    return ()=> clearTimeout(timeout);  // 每次在上一个useEffect处理完以后再运行
  }, [value, delay])

  return debouncedValue
}
  