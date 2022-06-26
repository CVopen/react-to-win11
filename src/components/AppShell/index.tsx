/* eslint-disable max-params */
import React, { useCallback, useRef, useState } from 'react'
import { Resizable } from 're-resizable'
import { IShellProps, ShellDiv } from './type-css'
import useStatusEff from '@/hooks/useStatusEff'

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
  const isMove = useRef({ isMove: false, x: 100, y: 100 })
  const shellRef = useRef<HTMLDivElement | null>(null)
  const resizePosition = useRef(false)
  const [size, setSize] = useState({ width: width || minWidth, height: height || minHeight })

  const effect = () => {
    if (!animate) return
    setTimeout(setAnimate, time)
  }

  const [animate, setAnimate] = useStatusEff<boolean | undefined>(false, effect)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (animate) return
      const { clientX, clientY } = e
      let transform: string | string[] = getComputedStyle(shellRef.current as HTMLDivElement, null).transform
      if (transform === 'none') transform = '0,0,0,0,0,0)'
      transform = transform.slice(0, transform.length - 1).split(',')
      isMove.current = {
        isMove: true,
        x: clientX - Number(transform[4]),
        y: clientY - Number(transform[5]),
      }
    },
    [animate],
  )

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isMove.current.isMove) return
    const { clientX, clientY } = e
    const top = clientY - isMove.current.y
    const left = clientX - isMove.current.x
    ;(shellRef.current as HTMLDivElement).style.transform = `translate(${left}px, ${top}px)`
  }, [])

  const handleClearMove = useCallback(() => {
    isMove.current.isMove = false
  }, [])

  return (
    <ShellDiv
      ref={shellRef}
      style={{
        transform: animate ? 'translate(0, 0)' : '',
        transition: animate ? `all ${time}ms` : '',
        top: resizePosition.current ? 0 : top,
        left: resizePosition.current ? 0 : left,
      }}
    >
      <Resizable
        size={size}
        style={{ transition: animate ? `all ${time}ms` : '' }}
        enable={{ right: !animate, bottom: !animate, bottomRight: !animate }}
        minWidth={minWidth}
        maxWidth={window.innerWidth}
        minHeight={minHeight}
        maxHeight={window.innerHeight - 48}
        onResizeStop={(e, direction, ref, d) => {
          d.width += size.width
          d.height += size.height
          setSize(d)
        }}
      >
        <div
          className="shell-header"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleClearMove}
          onMouseUp={handleClearMove}
        >
          header
        </div>
        <button
          onClick={() => {
            setAnimate(true)
            resizePosition.current = true
            setSize({ width: window.innerWidth / 2, height: window.innerHeight - 48 })
          }}
        >
          点我
        </button>
        {children}
      </Resizable>
    </ShellDiv>
  )
}
