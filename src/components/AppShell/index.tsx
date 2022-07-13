/* eslint-disable max-params */
import React, { useCallback, useRef } from 'react'
import { Resizable } from 're-resizable'
import { IShellProps, ShellDiv } from './type-css'
import useStatusEff from '@/hooks/useStatusEff'
import Icon from '../Icon'

const enable = { right: true, bottom: true, bottomRight: true }

function computedTransform(dom: HTMLDivElement): [number, number] {
  let transform: string | string[] = getComputedStyle(dom, null).transform
  if (transform === 'none') transform = '0,0,0,0,0,0)'
  transform = transform.slice(0, transform.length - 1).split(',')
  return [Number(transform[4]), Number(transform[5])]
}

export default function index({
  children,
  width,
  height,
  minWidth = 320,
  minHeight = 200,
  time = 300,
  top = 100,
  left = 100,
}: IShellProps) {
  const isMove = useRef({ isMove: false, x: left, y: top, resizePosition: false, isFristMove: true })
  const shellRef = useRef<HTMLDivElement | null>(null)

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

  const prevPosition = useRef({ x: left, y: top, w: size.width, h: size.height, full: false })

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
    if (!isMove.current.isMove) return

    const { clientX, clientY } = e
    const x = clientX - isMove.current.x
    const y = clientY - isMove.current.y
    ;(shellRef.current as HTMLDivElement).style.transform = `translate(${x}px, ${y}px)`
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
      if (isMove.current.isFristMove) {
        isMove.current.resizePosition = false
      }
      setSize({ width: prevPosition.current.w, height: prevPosition.current.h, animate: true })
      ;(
        shellRef.current as HTMLDivElement
      ).style.transform = `translate(${prevPosition.current.x}px, ${prevPosition.current.y}px)`
    } else {
      setSize({ width: window.innerWidth, height: window.innerHeight - 48, animate: true })
      ;(shellRef.current as HTMLDivElement).style.transform = ''
    }
    prevPosition.current.full = !prevPosition.current.full
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
        onResizeStop={(e, direction, ref, d) => {
          d.width += size.width
          d.height += size.height
          setSize({ ...size, ...d })
          prevPosition.current.w = d.width
          prevPosition.current.h = d.height
          prevPosition.current.full = false
        }}
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
            <div className="" onClick={handleFull}>
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
        <button
          onClick={() => {
            isMove.current.resizePosition = true
            setSize({ width: window.innerWidth / 2, height: window.innerHeight - 48, animate: true })
            ;(shellRef.current as HTMLDivElement).style.transform = ''
          }}
        >
          点我
        </button>
        {children}
      </Resizable>
    </ShellDiv>
  )
}
