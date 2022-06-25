import React, { memo, useState } from 'react'
import DesktopIcon from '@/components/DesktopIcon'
import MenuIcon from './MenuIcon'
import useEvent from '@/hooks/useEvent'
import { DesktopIconDiv } from '../type-css'

function DesktopIconList() {
  const config = [
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
  ]

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

  return (
    <DesktopIconDiv>
      {config.map(({ name, src }) => (
        <DesktopIcon
          key={src}
          name={name}
          src={src}
          onClick={() => {
            console.log(name)
          }}
        />
      ))}
      <MenuIcon isShow={isShow} active={active} />
    </DesktopIconDiv>
  )
}

export default memo(DesktopIconList)
