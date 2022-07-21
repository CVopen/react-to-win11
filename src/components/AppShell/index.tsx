/* eslint-disable max-params */
import React, { memo, MutableRefObject, useCallback, useEffect, useRef } from 'react'
import { NumberSize, Resizable } from 're-resizable'
import { IGlobalRef, IShellProps, ShellDiv, SplitSetHandlerType } from './type-css'
import useStatusEff from '@/hooks/useStatusEff'
import Icon from '../Icon'
import { Direction } from 're-resizable/lib/resizer'
import SplitScreen from './SplitScreen'
import { useAppDispatch, useAppSelector } from '@/store'
import { changeAppActive, changeAppIsHide, closeApp } from '@/store/win'
import { computedTransform, getKeyName } from '@/utils'

const minWidth = 360
const minHeight = 300

function index({ children, width, height, name, top = 100, left = 100 }: IShellProps) {
  const isMove = useRef({ isMove: false, x: left, y: top, resizePosition: false })
  const shellRef = useRef<HTMLDivElement | null>(null)
  const close = useRef(false)
  const splitShellRef = useRef() as MutableRefObject<IGlobalRef>

  const { activeApp, activeAppList, appAnimateTime: time } = useAppSelector(({ win }) => win)
  const dispatch = useAppDispatch()

  const effect = () => {
    if (!size.animate) return
    setTimeout(() => {
      if (!close.current) {
        setSize({ ...size, animate: false })
      } else {
        dispatch(closeApp(name))
      }
    }, time)
  }

  const [size, setSize] = useStatusEff(
    { width: width || minWidth, height: height || minHeight, animate: false },
    effect,
  )

  const prevPosition = useRef({ x: 0, y: 0, w: size.width, h: size.height, full: false })

  const appActive = useCallback(() => dispatch(changeAppActive(name)), [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (size.animate || (e.target as HTMLElement).tagName.toLowerCase() === 'img') return
      appActive()
      const { clientX, clientY } = e
      const [x, y] = computedTransform(shellRef.current as HTMLElement)
      isMove.current = {
        ...isMove.current,
        isMove: true,
        x: clientX - x,
        y: clientY - y,
      }
    },
    [size.animate],
  )

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isMove.current.isMove || !(e.target as HTMLElement).className) return

    const { clientX, clientY } = e
    prevPosition.current.x = clientX - isMove.current.x
    prevPosition.current.y = clientY - isMove.current.y
    shellRef.current!.style.transform = `translate(${prevPosition.current.x}px, ${prevPosition.current.y}px)`
  }, [])

  const handleClearMove = useCallback(() => {
    isMove.current.isMove = false
  }, [])

  const handleFull = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    isMove.current.resizePosition = true
    if (prevPosition.current.full) {
      setSize({ width: prevPosition.current.w, height: prevPosition.current.h, animate: true })
      isMove.current.resizePosition = false
      shellRef.current!.style.transform = `translate(${prevPosition.current.x}px, ${prevPosition.current.y}px)`
    } else {
      setSize({ width: window.innerWidth, height: window.innerHeight - 48, animate: true })
      shellRef.current!.style.transform = ''
    }
    prevPosition.current.full = !prevPosition.current.full
    splitShellRef.current.hide(true)
  }, [])

  const onResizeStop = useCallback(
    (e: MouseEvent | TouchEvent, di: Direction, r: HTMLElement, d: NumberSize) => {
      d.width += size.width
      d.height += size.height
      setSize({ ...size, ...d })
      const [x, y] = computedTransform(shellRef.current as HTMLElement)
      prevPosition.current = { x, y, w: d.width, h: d.height, full: false }
    },
    [size],
  )

  const splitMouseHandler = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    splitShellRef.current[e.type === 'mouseenter' ? 'enter' : 'leave']()
  }, [])

  const splitSetSize = useCallback<SplitSetHandlerType>(({ width, height, x, y }) => {
    isMove.current.resizePosition = true
    setSize({ width, height, animate: true })
    shellRef.current!.style.transform = `translate(${x}px, ${y}px)`
    prevPosition.current.full = false
  }, [])

  const resizeShell = useCallback((e: MouseEvent | TouchEvent, di: Direction, r: HTMLElement, d: NumberSize) => {
    if (['right', 'bottom', 'bottomRight'].includes(di)) return
    let x = prevPosition.current.x - d.width
    let y = prevPosition.current.y - d.height
    if (di === 'bottomLeft') {
      y = prevPosition.current.y
    } else if (di === 'topRight') {
      x = prevPosition.current.x
    }
    shellRef.current!.style.transform = `translate(${x}px, ${y}px)`
  }, [])

  useEffect(() => {
    if (size.animate) return
    const item = activeAppList.find((item) => item.name === name)
    if (item?.isHide) {
      const taskBarItem = document
        .querySelector('.task-middle')!
        .querySelector(`div[data-name='${getKeyName(name)}']`) as HTMLElement
      const barLeft = taskBarItem?.getBoundingClientRect().left
      setSize((preState) => {
        const x = (barLeft as number) - left - preState.width / 2
        const y = window.innerHeight - top - 48 - preState.height / 4
        shellRef.current!.style.opacity = '0'
        shellRef.current!.style.transform = `translate(${x}px, ${y}px) scale(.5)`
        return { ...preState, animate: true }
      })
    } else {
      setSize((preState) => {
        let { x, y } = prevPosition.current
        if (isMove.current.resizePosition) x = y = 0
        shellRef.current!.style.opacity = '1'
        shellRef.current!.style.transform = `translate(${x}px, ${y}px) scale(1)`
        return { ...preState, animate: true }
      })
    }
  }, [activeAppList])

  const shrink = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(changeAppIsHide(name))
  }, [])

  const handleClose = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    close.current = true
    setSize((preState) => {
      shellRef.current!.style.opacity = '.5'
      let { x, y } = prevPosition.current
      if (prevPosition.current.full) x = y = 0

      shellRef.current!.style.transform = `translate(${x}px, ${y}px) scale(.9)`
      return { ...preState, animate: true }
    })
  }, [])

  return (
    <ShellDiv
      className="app-shell"
      data-name={name}
      ref={shellRef}
      style={{
        transition: size.animate ? `all ${time}ms` : '',
        top: isMove.current.resizePosition ? 0 : top,
        left: isMove.current.resizePosition ? 0 : left,
        zIndex: activeApp === name ? 2 : 1,
      }}
      onClick={appActive}
    >
      <Resizable
        size={size}
        style={{ transition: size.animate ? `all ${time}ms` : '' }}
        minWidth={minWidth}
        maxWidth={window.innerWidth}
        minHeight={minHeight}
        maxHeight={window.innerHeight - 48}
        onResizeStop={onResizeStop}
        onResize={resizeShell}
      >
        <div
          className="shell-header"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleClearMove}
          onMouseUp={handleClearMove}
        >
          <div>header</div>
          <div className="shell-header-status">
            <Icon src="window-minimize-symbolic" size="small" status="actions" onClick={shrink} />
            <Icon
              src={`window-${prevPosition.current.full ? 'restore' : 'maximize'}-symbolic`}
              size="small"
              status="actions"
              onClick={handleFull}
              onMouseEnter={splitMouseHandler}
              onMouseLeave={splitMouseHandler}
            />
            <Icon src="window-close-symbolic" size="small" status="actions" onClick={handleClose} />
          </div>
        </div>
        <div className="shell-body" data-name={name}>
          {children}
        </div>
        <SplitScreen ref={splitShellRef} splitSetSize={splitSetSize} />
      </Resizable>
    </ShellDiv>
  )
}

export default memo(index)
