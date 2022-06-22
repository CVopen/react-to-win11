import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import Menu from '@/components/Menu'
import { MenuContext } from '..'
import { clacMenuPosition } from '@/utils'

function index() {
  const { isShow, clientX, clientY } = useContext(MenuContext)
  const ref = useRef<HTMLDivElement | null>(null)
  const [refExist, setRefExist] = useState({ X: -1000, Y: -1000, exist: false })

  useEffect(() => {
    if (ref.current) {
      setRefExist({
        ...clacMenuPosition({ X: clientX, Y: clientY, W: ref.current.clientWidth, H: ref.current.clientHeight }),
        exist: true,
      })
    }
    if (!isShow) {
      setRefExist({ X: -1000, Y: -1000, exist: true })
    }
  }, [ref.current, clientX, clientY, isShow])

  if (!isShow && !refExist.exist) return null

  return ReactDOM.createPortal(<Menu ref={ref} X={refExist.X} Y={refExist.Y} />, document.body)
}

export default memo(index)
