import React, { useEffect, useRef, useState } from 'react'

export interface IMenuState {
  isShow: boolean
  clientX: number
  clientY: number
}

export default function useContextmenu<T>(): { menuRef: React.MutableRefObject<T | null> } & IMenuState {
  const menuRef = useRef<T | null>(null)

  const [menuState, setMenuState] = useState<IMenuState>({ isShow: false, clientX: 0, clientY: 0 })

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      const { clientX, clientY } = e

      setMenuState({ clientX, clientY, isShow: e.target === menuRef.current })
    }
    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      setMenuState({ ...menuState, isShow: false })
    }

    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('click', handleClick)
    }
  }, [menuState])

  return { ...menuState, menuRef }
}
