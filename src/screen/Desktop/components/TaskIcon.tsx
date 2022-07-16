import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import Image from '@/components/Image'
import { TaskIconDiv } from '../type-css'
import useEvent from '@/hooks/useEvent'
import { useAppSelector } from '@/store'
import { explorerList } from '@/utils'

function TaskIcon({ src, hide, name }: { src: string; hide: boolean | undefined; name?: string | undefined }) {
  const [active, setActive] = useState(false)
  const [down, setDown] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const { activeApp } = useAppSelector(({ win }) => win)

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    setDown(e.type === 'mousedown')
    const className = (e.target as HTMLElement).className
    if (typeof className === 'string' && className.indexOf('task-icon') !== -1 && e.target !== ref.current) {
      setActive(false)
    }
  }, [])
  useEvent({ eventName: 'mouseup', cb: handleMouse })

  const handleClick = () => {
    if (hide) return
    setActive(!active)
  }

  useEffect(() => {
    if (hide) return
    setActive(activeApp === name || (explorerList.includes(activeApp) && name === 'explorer'))
  }, [activeApp, hide])

  return (
    <TaskIconDiv
      className="task-icon"
      ref={ref}
      down={down}
      active={active}
      hide={hide}
      onMouseDown={handleMouse}
      onClick={handleClick}
      data-src={src}
      data-name={name}
    >
      <Image width={24} height={24} src={require(`../../../assets/icon/task/${src}.png`)} data-src={src} />
    </TaskIconDiv>
  )
}

export default memo(TaskIcon)
