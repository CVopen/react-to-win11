import React, { createContext, lazy, Suspense } from 'react'
import { DesktopPage } from './type-css'

import AppShell from '@/components/AppShell'
import useContextmenu, { IMenuState } from '@/hooks/useContextmenu'
import useResize from '@/hooks/useResize'

const Menu = lazy(() => import('./components/Menu'))
const TaskBar = lazy(() => import('./components/TaskBar'))
const DesktopIconList = lazy(() => import('./components/DesktopIconList'))

export const MenuContext = createContext<IMenuState>({ isShow: false, clientX: 0, clientY: 0 })

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
        <MenuContext.Provider value={{ isShow, clientX, clientY }}>
          <DesktopIconList />
          <Menu />
          <TaskBar />
          <AppShell>
            <div style={{ height: '100%', background: '#fff' }}>center</div>
          </AppShell>
        </MenuContext.Provider>
      </Suspense>
    </DesktopPage>
  )
}
