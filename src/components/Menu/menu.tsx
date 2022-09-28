import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

// 某几个字符串中的一个,字符串字面量
type MenuMode = 'horizontal' | 'vertical'
type SelectedCallback = (selectedIndex: number) => void
export interface MenuProps {
  children?: React.ReactNode;
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectedCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectedCallback;
}

export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('xuxu-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
  const renderChildren = () => {
    // children不能直接使用map循环，因为children不一定是数组类型的。React提供了React.children.map，可以循环children
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index
        })
      } else {
        console.error('warning: menu has a child which is not a menuItem component')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        { renderChildren() }
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu