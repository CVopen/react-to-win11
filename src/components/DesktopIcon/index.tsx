import React, { memo, useRef, useState } from 'react'
import { useAppSelector } from '@/store'

import { DeskTopIconDiv, IDesktopIconProps } from './type-css'

function index({ src, onClick, name }: IDesktopIconProps) {
  const { desktopSize } = useAppSelector(({ win }) => win)
  const imgRef = useRef<null | HTMLImageElement>(null)
  const [down, setDown] = useState(false)

  const handleMouse = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    console.log(e)
    setDown(!down)
  }

  return (
    <DeskTopIconDiv size={desktopSize} onClick={onClick} down={down}>
      <img ref={imgRef} src={src} onMouseDown={handleMouse} onMouseUp={handleMouse} />
      <p>{name}</p>
    </DeskTopIconDiv>
  )
}

export default memo(index)
