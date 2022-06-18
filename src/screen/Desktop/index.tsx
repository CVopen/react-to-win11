import useContextmenu from '@/hooks/useContextmenu'
import useResize from '@/hooks/useResize'
import React, { lazy, Suspense } from 'react'
import { DesktopPage } from './type-css'

import defaultImage from '@/assets/img/wapppaper/default/default.jpg'

const Menu = lazy(() => import('./components/Menu'))

export default function index() {
  const { isShow, clientX, clientY, menuRef } = useContextmenu<HTMLDivElement>()
  console.log(require('../../assets/img/wapppaper/default/default.jpg'), defaultImage)
  useResize()

  return (
    <DesktopPage
      ref={menuRef}
      style={{ backgroundImage: `url(${require('../../assets/img/wapppaper/default/default.jpg')})` }}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        Desktop
        <Menu />
      </Suspense>
    </DesktopPage>
  )
}
