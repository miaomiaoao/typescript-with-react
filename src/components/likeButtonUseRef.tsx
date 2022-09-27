// 在组件中的任何一次渲染，props和state都始终保持不变
// 每次渲染都是相对独立的，怎么在几次渲染之间产生关系呢，需要使用useRef

// 修改ref的值不会触发组件的重新render

// useRef还可以访问组件的dom节点


/**
 * 总结：useRef的用法
 * 1. 在不同渲染中保持值的统一
 * 2. 判断是否第一次渲染组件(didMountRef)
 * 3. 获取dom
 */

// 不管你想传递的值层级有多么深，只要在provider的包裹下，都可以使用useContext拿到值

// context提出了在组件之间共享组件值的方式
// hook提供了一个useContext


import react, { useState, useRef, useEffect, useContext } from 'react'
import { ThemeContext } from '../App-old'

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0)
  const likeRef = useRef(0)
  const didMountRef = useRef(false)
  const domRef = useRef<HTMLInputElement>(null)

  // 拿到全局的context
  const theme = useContext(ThemeContext)
  const style = {
    background: theme.background,
    color: theme.color
  }

  useEffect(() => {
    console.log('document title effect is running')
    document.title = `点击了${like}次`
  }, [like])

  useEffect(() => {
    if (didMountRef.current) {
      console.log('this is updated')
    } else {
      didMountRef.current = true
    }
  })

  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus()
    }
  })
  function handleAlertClick() {
    setTimeout(() => {
      alert('you clicked on' + likeRef.current)
    }, 3000)
  }
  return (
    <>
      <input type="text" ref={domRef} />
      <button style={style} onClick={() => { setLike(like + 1); likeRef.current++ } }>
        {like}赞
      </button>
      <button onClick={handleAlertClick}>Alert!</button>
    </>
  )
}

export default LikeButton