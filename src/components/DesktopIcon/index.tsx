import React, { memo, useCallback, useRef, useState } from 'react'
import { useAppSelector } from '@/store'

import { DeskTopIconDiv, IDesktopIconProps } from './type-css'
import useEvent from '@/hooks/useEvent'
import Menu from './Menu'

function index({ src, onClick, name }: IDesktopIconProps) {
  const { desktopSize } = useAppSelector(({ win }) => win)
  const imgRef = useRef<null | HTMLImageElement>(null)
  const divRef = useRef<null | HTMLDivElement>(null)
  const pRef = useRef<null | HTMLParagraphElement>(null)
  const [down, setDown] = useState(false)
  const [isShow, setShow] = useState(false)

  const handleMouseDown = useCallback(() => {
    setDown(true)
  }, [])

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      setShow(e.target === divRef.current || e.target === imgRef.current || e.target === pRef.current)
      setDown(false)
    },
    [isShow],
  )

  useEvent({ eventName: 'mouseup', cb: handleMouseUp })

  const handleClick = useCallback(() => {
    setDown(false)
    setShow(false)
    onClick()
  }, [onclick])

  return (
    <DeskTopIconDiv ref={divRef} size={desktopSize} onClick={handleClick} down={down}>
      <img ref={imgRef} src={src} onMouseDown={handleMouseDown} />
      <p ref={pRef}>{name}</p>
      <Menu isShow={isShow} />
    </DeskTopIconDiv>
  )
}

export default memo(index)
