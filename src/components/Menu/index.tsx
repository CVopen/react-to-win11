import React, { memo, useContext, useRef } from 'react'
import ReactDOM from 'react-dom'

import useStatusEff from '@/hooks/useStatusEff'
import { MenuContext } from '@/screen/Desktop'
import { clacMenuPosition } from '@/utils'
import { IMenuProps, IState, MenuDiv } from './type-css'

const Menu = (props: IMenuProps) => {
  const { isShow, clientX, clientY } = useContext(MenuContext)
  const ref = useRef<HTMLDivElement | null>(null)

  const effect = () => {
    if (!ref.current) return

    const setStatus = (show: boolean) => {
      if (!show) return setRefExist({ X: -1000, Y: -1000, exist: true })
      setRefExist({
        ...clacMenuPosition({ X: clientX, Y: clientY, W: ref.current!.clientWidth, H: ref.current!.clientHeight }),
        exist: true,
      })
    }
    if (typeof props.show === 'boolean') {
      setStatus(props.show)
    } else {
      setStatus(isShow)
    }
  }

  const [refExist, setRefExist] = useStatusEff<IState>(
    { X: -1000, Y: -1000, exist: false },
    [ref.current, clientX, clientY, isShow, props.show],
    effect,
  )

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
