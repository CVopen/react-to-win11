import React, { memo, useCallback, useState } from 'react'
import { useAppSelector } from '@/store'

import { DeskTopIconDiv, IDesktopIconProps } from './type-css'
import useEvent from '@/hooks/useEvent'

function index({ src, name }: IDesktopIconProps) {
  const { desktopSize } = useAppSelector(({ win }) => win)
  const [down, setDown] = useState(false)

  const handleMouseDown = useCallback(() => {
    setDown(true)
  }, [])

  const handleMouseUp = useCallback(() => setDown(false), [])

  useEvent({ eventName: 'mouseup', cb: handleMouseUp })

  const handleClick = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDown(false)
  }, [])

  return (
    <DeskTopIconDiv data-name={name} size={desktopSize} onClick={handleClick} down={down}>
      <div onMouseDown={handleMouseDown} data-name={name}>
        <img style={{ userSelect: 'none' }} src={src} />
      </div>
      <p data-name={name}>{name}</p>
    </DeskTopIconDiv>
  )
}

export default memo(index)
