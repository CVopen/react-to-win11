import React, { memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Image from '@/components/Image'
import { TaskIconDiv } from '../type-css'
import useEvent from '@/hooks/useEvent'
import { useAppDispatch, useAppSelector } from '@/store'
import { explorerList } from '@/utils'
import { changeAppIsHide, changeAppList } from '@/store/win'
import { TAppList } from '@/store/win/state'
import { render } from './render'

function TaskIcon({
  src,
  hide,
  name,
  index,
}: {
  src: string
  hide: boolean | undefined
  name?: string | undefined
  index?: number
}) {
  const [active, setActive] = useState(false)
  const [down, setDown] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)

  const isClick = useRef(true)

  const { activeApp, activeAppList, appAnimateTime: time } = useAppSelector(({ win }) => win)
  const dispatch = useAppDispatch()

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    setDown(e.type === 'mousedown')
    const className = (e.target as HTMLElement).className
    if (typeof className === 'string' && className.indexOf('task-icon') !== -1 && e.target !== ref.current) {
      setActive(false)
    }
  }, [])
  useEvent({ eventName: 'mouseup', cb: handleMouse })

  const handleClick = () => {
    if (hide) {
      if (!name) {
        // TODO: 这里处理开始菜单等
        return
      }
      let app = render(name)

      if (!app) return

      return dispatch(
        changeAppList(
          Array.isArray(app)
            ? { app: app[1] as ReactNode, name, info: app[0] as TAppList }
            : { app, name: name === 'explorer' ? 'CVopen' : name },
        ),
      )
    }
    if (!isClick.current) return
    setActive(!active)
    isClick.current = false
    setTimeout(() => {
      isClick.current = true
    }, time)

    if (name === 'explorer') {
      const eList = activeAppList.reduce((target, item) => {
        if (explorerList.includes(item.name)) target.push(item.name)
        return target
      }, [] as string[])
      if (eList.length === 0) {
        // TODO: 启动应用
      } else if (eList.length === 1) {
        dispatch(changeAppIsHide(eList[0]))
      } else {
        // TODO: 任务栏预览窗口
      }
    } else {
      dispatch(changeAppIsHide(name as string))
    }
  }

  useEffect(() => {
    if (hide) return setActive(false)
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
      index={index}
    >
      {typeof index === 'number' ? (
        <span>
          <Image width={24} height={24} src={require(`../../../assets/icon/task/${src}.png`)} data-src={src} />
        </span>
      ) : (
        <Image width={24} height={24} src={require(`../../../assets/icon/task/${src}.png`)} data-src={src} />
      )}
    </TaskIconDiv>
  )
}

export default memo(TaskIcon)
