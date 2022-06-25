import React, { useCallback, useRef, useState } from 'react'
import Image from '@/components/Image'
import { TaskIconDiv } from '../type-css'
import useEvent from '@/hooks/useEvent'

export default function TaskIcon({ src, hide }: { src: string; hide?: boolean | undefined }) {
  const [active, setActive] = useState(false)
  const [down, setDown] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    setDown(e.type === 'mousedown')
    if ((e.target as HTMLElement).className.indexOf('task-icon') !== -1 && e.target !== ref.current) {
      setActive(false)
    }
  }, [])
  useEvent({ eventName: 'mouseup', cb: handleMouse })

  const handleClick = () => {
    if (hide) return
    setActive(!active)
  }
  return (
    <TaskIconDiv
      className="task-icon"
      ref={ref}
      down={down}
      active={active}
      hide={hide}
      onMouseDown={handleMouse}
      onClick={handleClick}
    >
      <Image width={24} height={24} src={require(`../../../assets/icon/task/${src}.png`)} />
    </TaskIconDiv>
  )
}
