// ## 实践Suspense
// 转换Promise为Suspense支持的数据结构
// wrapPromise的工作机制： 
// - 接收Promise作为参数
// - 当Promise resovled， 返回resolved value
// - 当Promise rejected， throw对应的rejected value
// - 当Promise pending，throw对应的Promise对象
// - 暴露一个对应的read方法，来读取Promise的状态
import axios from 'axios'


function wrapPromise(promise: Promise<any>) {
  // 设定两个变量，一个指示当前状态，一个指示最后的结果
  let status = 'pending'
  let result: any

  let suspender = promise.then((r) => {
    status = 'success'
    result = r
  }, e => {
    status = 'error'
    result = e
  })
  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    }
  }
}


// 把promise转换成suspense对应的数据格式

export default function fecthData(url: string) {
  const promise = axios.get(url).then((rawData: any) => rawData.data)
  return wrapPromise(promise)
}