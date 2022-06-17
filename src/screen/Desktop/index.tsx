import useContextmenu from '@/hooks/useContextmenu'
import useResize from '@/hooks/useResize'
import React, { lazy, Suspense } from 'react'

const Menu = lazy(() => import('./components/Menu'))

export default function index() {
  const { isShow, clientX, clientY, menuRef } = useContextmenu<HTMLDivElement>()

  useResize()

  return (
    <div ref={menuRef}>
      <Suspense fallback={<h1>Loading...</h1>}>
        Desktop
        <Menu />
      </Suspense>
    </div>
  )
}
