/* eslint-disable max-params */
import React, { memo, MutableRefObject, useCallback, useRef, useState } from 'react'
import { NumberSize, Resizable } from 're-resizable'
import { IGlobalRef, IShellProps, ShellDiv, SplitSetHandlerType } from './type-css'
import useStatusEff from '@/hooks/useStatusEff'
import Icon from '../Icon'
import { Direction } from 're-resizable/lib/resizer'
import SplitScreen from './SplitScreen'

const enable = { right: true, bottom: true, bottomRight: true }

function computedTransform(dom: HTMLDivElement): [number, number] {
  let transform: string | string[] = getComputedStyle(dom, null).transform
  if (transform === 'none') transform = '0,0,0,0,0,0)'
  transform = transform.slice(0, transform.length - 1).split(',')
  return [Number(transform[4]), Number(transform[5])]
}

const minWidth = 360
const minHeight = 300

function index({ children, width, height, time = 300, top = 100, left = 100 }: IShellProps) {
  const isMove = useRef({ isMove: false, x: left, y: top, resizePosition: false })
  const shellRef = useRef<HTMLDivElement | null>(null)

  const splitShellRef = useRef() as MutableRefObject<IGlobalRef>

  const effect = () => {
    if (!size.animate) return
    setTimeout(() => {
      setSize({ ...size, animate: false })
    }, time)
  }

  const [size, setSize] = useStatusEff(
    { width: width || minWidth, height: height || minHeight, animate: false },
    effect,
  )

  const prevPosition = useRef({ x: 0, y: 0, w: size.width, h: size.height, full: false })

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (size.animate) return
      const { clientX, clientY } = e
      const [x, y] = computedTransform(shellRef.current as HTMLDivElement)
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
    const x = clientX - isMove.current.x
    const y = clientY - isMove.current.y
    shellRef.current!.style.transform = `translate(${x}px, ${y}px)`
    prevPosition.current.x = x
    prevPosition.current.y = y
  }, [])

  const handleClearMove = useCallback(() => {
    isMove.current.isMove = false
  }, [])

  const handleFull = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
  }, [])

  const onResizeStop = useCallback(
    (e: MouseEvent | TouchEvent, di: Direction, r: HTMLElement, d: NumberSize) => {
      d.width += size.width
      d.height += size.height
      setSize({ ...size, ...d })
      prevPosition.current.w = d.width
      prevPosition.current.h = d.height
      prevPosition.current.full = false
    },
    [size],
  )

  const splitMouseHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.type === 'mouseenter') {
      splitShellRef.current?.enter()
    } else {
      splitShellRef.current?.leave()
    }
  }, [])

  const splitSetSize = useCallback<SplitSetHandlerType>(({ width, height, x, y }) => {
    isMove.current.resizePosition = true
    setSize({ width, height, animate: true })
    shellRef.current!.style.transform = `translate(${x}px, ${y}px)`
  }, [])

  return (
    <ShellDiv
      ref={shellRef}
      style={{
        transition: size.animate ? `all ${time}ms` : '',
        top: isMove.current.resizePosition ? 0 : top,
        left: isMove.current.resizePosition ? 0 : left,
      }}
    >
      <Resizable
        size={size}
        style={{ transition: size.animate ? `all ${time}ms` : '' }}
        enable={enable}
        minWidth={minWidth}
        maxWidth={window.innerWidth}
        minHeight={minHeight}
        maxHeight={window.innerHeight - 48}
        onResizeStop={onResizeStop}
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
            <div>
              <Icon src="window-minimize-symbolic" size="small" status="actions" />
            </div>
            <div onClick={handleFull} onMouseEnter={splitMouseHandler} onMouseLeave={splitMouseHandler}>
              {prevPosition.current.full ? (
                <Icon src="window-restore-symbolic" size="small" status="actions" />
              ) : (
                <Icon src="window-maximize-symbolic" size="small" status="actions" />
              )}
            </div>
            <div>
              <Icon src="window-close-symbolic" size="small" status="actions" />
            </div>
          </div>
        </div>
        {children}
        <SplitScreen ref={splitShellRef} splitSetSize={splitSetSize} />
      </Resizable>
    </ShellDiv>
  )
}

export default memo(index)
