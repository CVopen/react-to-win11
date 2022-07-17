import React, { memo, useRef, forwardRef, useImperativeHandle, MutableRefObject } from 'react'
import { IGlobalRef, ISplitProps } from './type-css'

type Timer = ReturnType<typeof setTimeout>

const size = [
  {
    width: window.innerWidth / 2,
    height: window.innerHeight - 48,
    x: 0,
    y: 0,
  },
  {
    width: window.innerWidth / 2,
    height: window.innerHeight - 48,
    x: window.innerWidth / 2,
    y: 0,
  },
  {
    width: (window.innerWidth / 3) * 2,
    height: window.innerHeight - 48,
    x: 0,
    y: 0,
  },
  {
    width: window.innerWidth / 3,
    height: window.innerHeight - 48,
    x: (window.innerWidth / 3) * 2,
    y: 0,
  },
  {
    width: window.innerWidth / 3,
    height: window.innerHeight - 48,
    x: 0,
    y: 0,
  },
  {
    width: window.innerWidth / 3,
    height: window.innerHeight - 48,
    x: window.innerWidth / 3,
    y: 0,
  },
  {
    width: window.innerWidth / 3,
    height: window.innerHeight - 48,
    x: (window.innerWidth / 3) * 2,
    y: 0,
  },
  {
    width: window.innerWidth / 2,
    height: window.innerHeight - 48,
    x: 0,
    y: 0,
  },
  {
    width: window.innerWidth / 2,
    height: (window.innerHeight - 48) / 2,
    x: window.innerWidth / 2,
    y: 0,
  },
  {
    width: window.innerWidth / 2,
    height: (window.innerHeight - 48) / 2,
    x: window.innerWidth / 2,
    y: (window.innerHeight - 48) / 2,
  },
  {
    width: window.innerWidth / 2,
    height: (window.innerHeight - 48) / 2,
    x: 0,
    y: 0,
  },
  {
    width: window.innerWidth / 2,
    height: (window.innerHeight - 48) / 2,
    x: window.innerWidth / 2,
    y: 0,
  },
  {
    width: window.innerWidth / 2,
    height: (window.innerHeight - 48) / 2,
    x: 0,
    y: (window.innerHeight - 48) / 2,
  },
  {
    width: window.innerWidth / 2,
    height: (window.innerHeight - 48) / 2,
    x: window.innerWidth / 2,
    y: (window.innerHeight - 48) / 2,
  },
  {
    width: window.innerWidth / 4,
    height: window.innerHeight - 48,
    x: 0,
    y: 0,
  },
  {
    width: window.innerWidth / 2,
    height: window.innerHeight - 48,
    x: window.innerWidth / 4,
    y: 0,
  },
  {
    width: window.innerWidth / 4,
    height: window.innerHeight - 48,
    x: (window.innerWidth / 4) * 3,
    y: 0,
  },
]

const SplitScreen = forwardRef((props: ISplitProps, ref) => {
  const screenRef = useRef<HTMLDivElement | null>(null)
  const timer = useRef<Timer | null>(null)

  const clear = () => {
    clearTimeout(timer.current as Timer)
    timer.current = null
  }

  const hide = (offHand?: boolean) => {
    screenRef.current!.style.opacity = '0'
    clear()
    timer.current = setTimeout(
      () => {
        screenRef.current!.style.height = '0'
        screenRef.current!.style.paddingTop = '0'
        clear()
      },
      offHand ? 400 : 0,
    )
  }

  const leave = () => {
    clear()
    timer.current = setTimeout(hide, 1000)
  }

  useImperativeHandle(ref as MutableRefObject<IGlobalRef>, () => ({
    enter() {
      clear()
      timer.current = setTimeout(() => {
        screenRef.current!.style.height = '134px'
        screenRef.current!.style.paddingTop = '10px'
        screenRef.current!.style.opacity = '1'
        clear()
      }, 1000)
    },
    leave,
    hide,
  }))

  const clickHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const index = Array.from(document.getElementsByClassName('mode-block')).findIndex((item) => item === e.target)
    props.splitSetSize(size[index % 17])
    hide(true)
  }

  return (
    <div className="shell-split-screen" ref={screenRef} onClick={clickHandle} onMouseEnter={clear} onMouseLeave={leave}>
      <div className="shell-split-screen-mode mode-one">
        <div className="mode-block block-radius-tl block-radius-bl" />
        <div className="mode-block block-radius-tr block-radius-br" />
      </div>
      <div className="shell-split-screen-mode mode-two">
        <div className="mode-block block-radius-tl block-radius-bl" />
        <div className="mode-block block-radius-tr block-radius-br" />
      </div>
      <div className="shell-split-screen-mode mode-three">
        <div className="mode-block block-radius-tl block-radius-bl" />
        <div className="mode-block" />
        <div className="mode-block block-radius-tr block-radius-br" />
      </div>
      <div className="shell-split-screen-mode mode-four">
        <div className="mode-block block-radius-tl block-radius-bl" />
        <div className="mode-block block-radius-tr" />
        <div className="mode-block block-radius-br" />
      </div>
      <div className="shell-split-screen-mode mode-five">
        <div className="mode-block block-radius-tl" />
        <div className="mode-block block-radius-tr" />
        <div className="mode-block block-radius-bl" />
        <div className="mode-block block-radius-br" />
      </div>
      <div className="shell-split-screen-mode mode-six">
        <div className="mode-block block-radius-tl block-radius-bl" />
        <div className="mode-block" />
        <div className="mode-block block-radius-tr block-radius-br" />
      </div>
    </div>
  )
})

export default memo(SplitScreen)
