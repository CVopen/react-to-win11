import React, { memo } from 'react'
import DesktopIcon from '@/components/DesktopIcon'

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

  return (
    <>
      <DesktopIcon name="此电脑" src={require('@/assets/img/desktop/Computer.png')} onClick={() => {}} />
      <DesktopIcon name="回收站" src={require('@/assets/img/desktop/Trash Full.png')} onClick={() => {}} />
      <DesktopIcon name="网络" src={require('@/assets/img/desktop/Network.png')} onClick={() => {}} />
      <DesktopIcon name="控制面板" src={require('@/assets/img/desktop/Control Panel.png')} onClick={() => {}} />
      <DesktopIcon name="CVopen" src={require('@/assets/img/desktop/Explorer.png')} onClick={() => {}} />
      <DesktopIcon name="Microsoft Edge" src={require('@/assets/img/desktop/edge browser.png')} onClick={() => {}} />
      <DesktopIcon name="Github" src={require('@/assets/img/desktop/github.png')} onClick={() => {}} />
    </>
  )
}

export default memo(DesktopIconList)
