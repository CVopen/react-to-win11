import React, { memo, useContext } from 'react'
import ReactDOM from 'react-dom'

import Menu from '@/components/Menu'
import { MenuContext } from '..'

function index() {
  const { isShow, clientX, clientY } = useContext(MenuContext)

  if (!isShow) return null
  return ReactDOM.createPortal(<Menu X={clientX} Y={clientY} />, document.body)
}

export default memo(index)
