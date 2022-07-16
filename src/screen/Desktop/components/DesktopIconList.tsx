import React, { memo, ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import DesktopIcon from '@/components/DesktopIcon'
import MenuIcon from './MenuIcon'
import useEvent from '@/hooks/useEvent'
import { DesktopIconDiv } from '../type-css'
import { useAppDispatch, useAppSelector } from '@/store'
import Explorer from '@/app/Explorer'
import { changeAppList } from '@/store/win'
import Edge from '@/app/Edge'
import Music from '@/app/Music'
import { TAppList } from '@/store/win/state'

function DesktopIconList() {
  const dispatch = useAppDispatch()
  const { activeAppList } = useAppSelector(({ win }) => win)

  const isTimer = useRef(false)

  const config = useMemo(
    () => [
      {
        name: '此电脑',
        src: require('@/assets/img/desktop/Computer.png'),
      },
      {
        name: '回收站',
        src: require('@/assets/img/desktop/Trash Full.png'),
      },
      {
        name: '网络',
        src: require('@/assets/img/desktop/Network.png'),
      },
      {
        name: '控制面板',
        src: require('@/assets/img/desktop/Control Panel.png'),
      },
      {
        name: 'CVopen',
        src: require('@/assets/img/desktop/Explorer.png'),
      },
      {
        name: 'Microsoft Edge',
        src: require('@/assets/img/desktop/edge browser.png'),
      },
      {
        name: 'Github',
        src: require('@/assets/img/desktop/github.png'),
      },
      {
        name: '网易云',
        src: require('@/assets/img/desktop/wy-music.png'),
      },
    ],
    [],
  )

  const [isShow, setShow] = useState(false)
  const [active, setActive] = useState<typeof config[number]>({ name: '', src: '' })

  useEvent({
    eventName: 'click',
    cb: () => setShow(false),
  })

  useEvent({
    eventName: 'contextmenu',
    cb(e) {
      const activeName = (e.target as HTMLElement).dataset.name
      if (!activeName) return setShow(false)
      const active = config.find(({ name }) => name === activeName)
      if (!active) return
      setShow(true)
      setActive(active)
    },
  })

  const render = useCallback((name: string) => {
    const key = new Date().getTime()
    switch (name) {
      case 'Microsoft Edge':
        return <Edge key={key} />
      case '网易云':
        return [{ src: 'wy-music', name }, <Music key={key} />]
      case 'Github':
        window.open('https://github.com/CVopen', '_blank')
        isTimer.current = false
        return null
      default:
        return <Explorer name={name} key={key} />
    }
  }, [])

  const renderApp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isTimer.current) return
    isTimer.current = true
    const name = (e.target as HTMLElement).dataset.name as string
    const activeApp = activeAppList.find((item) => item.name === name)
    if (activeApp) return
    let app = render(name)

    if (!app) return

    dispatch(
      changeAppList(Array.isArray(app) ? { app: app[1] as ReactNode, name, info: app[0] as TAppList } : { app, name }),
    )

    setTimeout(() => {
      isTimer.current = false
    }, 500)
  }

  return (
    <>
      <DesktopIconDiv onClick={renderApp}>
        {config.map(({ name, src }) => (
          <DesktopIcon key={src} name={name} src={src} />
        ))}
        <MenuIcon isShow={isShow} active={active} />
      </DesktopIconDiv>
      {activeAppList.map(({ app }) => app)}
    </>
  )
}

export default memo(DesktopIconList)
