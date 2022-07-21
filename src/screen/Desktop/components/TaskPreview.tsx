import React, { forwardRef, memo, MutableRefObject, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { IPreviewRef } from '../type-css'
import { computedTransform, constant, getKeyName, isExploer, taskIconMap, Timer } from '@/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { changeAppIsHide, closeApp } from '@/store/win'
import Icon from '@/components/Icon'

const TaskPreview = memo(
  forwardRef(({ width }: { width: number }, ref) => {
    const preRef = useRef<HTMLDivElement | null>(null)
    const timer = useRef<Timer | null>(null)

    const { appAnimateTime: time } = useAppSelector(({ win }) => win)
    const dispatch = useAppDispatch()

    const [preview, setPreviewState] = useState<{
      visible: boolean
      url: string[]
      icon: string
      name: string
      index: number
      active: number
    }>({
      visible: false,
      url: [],
      icon: '',
      name: '',
      index: 0,
      active: 0,
    })

    const close = () => {
      if (timer.current) return
      timer.current = setTimeout(() => {
        setPreviewState({ ...preview, visible: false })
        timer.current = null
      }, 300)
    }

    useImperativeHandle(ref as MutableRefObject<IPreviewRef>, () => ({
      setUrl(url, name, index) {
        setPreviewState({
          index,
          url,
          visible: true,
          name,
          icon: taskIconMap[getKeyName(name)] as string,
          active: preview.active,
        })
      },
      close,
    }))

    useEffect(() => {
      if (!preview.visible) return
      preRef.current!.style.left = `${(window.innerWidth - width) / 2 + preview.index * 40 + 20}px`
    }, [preview])

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      clearTimeout(timer.current as Timer)
      timer.current = null
      setPreviewState({ ...preview, active: Number((e.target as HTMLElement).dataset.index) })
    }

    const getCurrentApp = () => {
      if (preview.name !== constant.explorer) {
        return [preview.name]
      }
      return Array.from(document.getElementsByClassName('shell-body')).reduce((target, item) => {
        const name = (item as HTMLElement).dataset.name as string
        if (isExploer(name)) {
          target.push(name)
        }
        return target
      }, [] as string[])
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      if (preview.name === constant.explorer) {
        const appNameList = getCurrentApp()
        dispatch(changeAppIsHide({ name: appNameList[Number((e.target as HTMLElement).dataset.index)] }))
      } else {
        dispatch(changeAppIsHide({ name: preview.name }))
      }
      setPreviewState({ ...preview, visible: false })
    }

    const taskCloseApp = () => {
      const targetAppName = getCurrentApp()[preview.active]
      const targetDom = Array.from(document.getElementsByClassName('app-shell')).find((item) => {
        return (item as HTMLElement).dataset.name === targetAppName
      }) as HTMLElement
      const [x, y] = computedTransform(targetDom)
      targetDom!.style.opacity = '.5'
      targetDom!.style.transition = `all ${time}ms`
      targetDom!.style.transform = `translate(${x}px, ${y}px) scale(.9)`
      setTimeout(() => {
        dispatch(closeApp(targetAppName))
      }, time)
    }

    if (!preview.visible) return null

    return (
      <div className="task-preview" ref={preRef} onMouseLeave={close} onClick={handleClick}>
        {preview.url.map((u, i) => (
          <div className="task-preview-item" key={`${i}${preview.name}`} data-index={i} onMouseEnter={handleMouseEnter}>
            <div>
              <img src={preview.icon} />
              <span>{preview.name}sdfdsfsdafsdfsdfsdfsdfsdfa</span>
              {preview.active === i && (
                <Icon src="window-close-symbolic" size="small" status="actions" onClick={taskCloseApp} />
              )}
            </div>
            <img src={u} />
          </div>
        ))}
      </div>
    )
  }),
)

export default TaskPreview
