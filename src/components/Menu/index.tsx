import { MenuContext } from '@/screen/Desktop'
import { clacMenuPosition } from '@/utils'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { IMenuProps, MenuDiv } from './type-css'

const Menu = (props: IMenuProps) => {
  const { isShow, clientX, clientY } = useContext(MenuContext)
  const ref = useRef<HTMLDivElement | null>(null)
  const [refExist, setRefExist] = useState({ X: -1000, Y: -1000, exist: false })

  useEffect(() => {
    if (!ref.current) return
    if (typeof props.show === 'boolean') {
      setStatus(props.show)
    } else {
      setStatus(isShow)
    }
  }, [ref.current, clientX, clientY, isShow, props.show])

  const setStatus = (show: boolean) => {
    if (show) {
      setRefExist({
        ...clacMenuPosition({ X: clientX, Y: clientY, W: ref.current!.clientWidth, H: ref.current!.clientHeight }),
        exist: true,
      })
    } else {
      setRefExist({ X: -1000, Y: -1000, exist: true })
    }
  }

  if (typeof props.show === 'boolean') {
    if (!props.show && !refExist.exist) return null
  } else {
    if (!isShow && !refExist.exist) return null
  }

  return ReactDOM.createPortal(
    <MenuDiv X={refExist.X} Y={refExist.Y} ref={ref}>
      {props.children}
    </MenuDiv>,
    document.body,
  )
}

export default memo(Menu)
