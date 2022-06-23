import React, { memo, useCallback, useState } from 'react'
import { useAppSelector } from '@/store'

import { DeskTopIconDiv, IDesktopIconProps } from './type-css'
import useEvent from '@/hooks/useEvent'

function index({ src, onClick, name }: IDesktopIconProps) {
  const { desktopSize } = useAppSelector(({ win }) => win)
  const [down, setDown] = useState(false)

  const handleMouseDown = useCallback(() => {
    setDown(true)
  }, [])

  const handleMouseUp = useCallback(() => setDown(false), [])

  useEvent({ eventName: 'mouseup', cb: handleMouseUp })

  const handleClick = useCallback(
    (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setDown(false)
      onClick(e)
    },
    [onclick],
  )

  return (
    <DeskTopIconDiv data-name={name} size={desktopSize} onClick={handleClick} down={down}>
      <img data-name={name} src={src} onMouseDown={handleMouseDown} />
      <p data-name={name}>{name}</p>
    </DeskTopIconDiv>
  )
}

export default memo(index)
