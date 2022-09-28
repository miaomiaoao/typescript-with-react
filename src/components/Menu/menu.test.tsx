import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      {/* 最开始需要传index,后面就不需要传index了 */}
      {/* <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>disabled</MenuItem>
      <MenuItem index={2}>xyz</MenuItem> */}
      {/* 加了这个之后会报错, 因为在menu中做了限制 */}

      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <li></li>
    </Menu>
  )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
// 测试Menu和MenuItem组件
describe('test Menu and MenuItem component', () => {
  // 这个函数在每个case开始前都会执行
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  // 使用默认的props能否成功渲染出争取的Menu和MenuItem
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('xuxu-menu test')
    // 希望渲染的menuItem数是3个
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  // 点击每一项改变active并且执行正确的callback
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  // 当mode等于vertical时，能否正确渲染出vertical形式的组件
  it('should render vertical mode when mode is set to vertical', () => {
    // 此时界面上会出现两个testid是test-menu的，因为在前面创建了一个。我们需要手动去清除一下
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})