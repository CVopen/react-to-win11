import useContextmenu from '@/hooks/useContextmenu'
import useResize from '@/hooks/useResize'
import React, { lazy, Suspense } from 'react'
import { DesktopPage } from './type-css'

const Menu = lazy(() => import('./components/Menu'))
const TaskBar = lazy(() => import('./components/TaskBar'))
const DesktopIconList = lazy(() => import('./components/DesktopIconList'))

export default function index() {
  const { isShow, clientX, clientY, menuRef } = useContextmenu<HTMLDivElement>()

  const Bomb = useResize()

  return (
    <DesktopPage
      ref={menuRef}
      style={{ backgroundImage: `url(${require('../../assets/img/wapppaper/default/default.jpg')})` }}
    >
      <Bomb />
      <Suspense fallback={<h1>Loading...</h1>}>
        <DesktopIconList />
        <Menu />
        <TaskBar />
      </Suspense>
    </DesktopPage>
  )
}
