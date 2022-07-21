import React, { memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas'

import Images from '@/components/Image'
import { IPreviewRef, TaskIconDiv } from '../type-css'
import useEvent from '@/hooks/useEvent'
import { useAppDispatch, useAppSelector } from '@/store'
import { constant, isExploer, Timer } from '@/utils'
import { changeAppIsHide, changeAppList } from '@/store/win'
import { TAppList } from '@/store/win/state'
import { render } from './render'

function TaskIcon({
  src,
  hide,
  name,
  index,
  preview,
}: {
  src: string
  hide: boolean | undefined
  name?: string | undefined
  index?: number
  preview?: IPreviewRef
}) {
  const [active, setActive] = useState(false)
  const [down, setDown] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const timer = useRef<Timer | null>(null)

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
            : { app, name: name === constant.explorer ? 'CVopen' : name },
        ),
      )
    }
    if (!isClick.current) return

    isClick.current = false
    setTimeout(() => {
      isClick.current = true
    }, time)

    let isActive = true

    if (name === constant.explorer) {
      const eList = activeAppList.reduce((target, item) => {
        if (isExploer(item.name)) target.push(item.name)
        return target
      }, [] as string[])
      if (eList.length === 1) {
        dispatch(changeAppIsHide(eList[0]))
      } else {
        isActive = false
        handlePreview()
      }
    } else {
      dispatch(changeAppIsHide(name as string))
    }
    handleMouseLeave()
    isActive && setActive(!active)
  }

  useEffect(() => {
    if (hide) return setActive(false)
    setActive(activeApp === name || (isExploer(activeApp) && name === constant.explorer))
  }, [activeApp, hide])

  const createUrl = useCallback(
    (target: HTMLElement[]) =>
      new Promise<string[]>((resolve) => {
        const url: string[] = []
        target.forEach((item, index) => {
          html2canvas(item).then((canvas) => {
            url.push(canvas.toDataURL())
            if (target.length === index + 1) resolve(url)
          })
        })
      }),
    [],
  )

  const clear = () => {
    clearTimeout(timer.current as Timer)
    timer.current = null
  }

  const handlePreview = (hover?: boolean) => {
    let shellList = Array.from(document.getElementsByClassName('shell-body'))
    if (name === constant.explorer) {
      shellList = shellList.filter((item) => isExploer((item as HTMLElement).dataset.name as string))
    } else {
      const target = shellList.find((item) => (item as HTMLElement).dataset.name === name)
      target ? (shellList = [target]) : (shellList = [])
    }
    if (!shellList.length) return

    if (hover) {
      timer.current = setTimeout(() => {
        clear()
        if (!isClick.current) return
        createUrl(shellList as HTMLElement[]).then((url) => preview!.setUrl?.(url, name as string, index!))
      }, 500)
    } else {
      createUrl(shellList as HTMLElement[]).then((url) => preview!.setUrl?.(url, name as string, index!))
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (e.target !== ref.current || typeof index !== 'number' || index < 2) return
    clear()
    handlePreview(true)
  }

  const handleMouseLeave = () => {
    clear()
    preview?.close()
  }

  return (
    <TaskIconDiv
      className="task-icon"
      ref={ref}
      down={down}
      active={active}
      hide={hide}
      onMouseDown={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-src={src}
      data-name={name}
      index={index}
    >
      {typeof index === 'number' && index > 1 ? (
        <span>
          <Images width={24} height={24} src={require(`../../../assets/icon/task/${src}.png`)} data-src={src} />
        </span>
      ) : (
        <Images width={24} height={24} src={require(`../../../assets/icon/task/${src}.png`)} data-src={src} />
      )}
    </TaskIconDiv>
  )
}

export default memo(TaskIcon)
