import { useEffect } from 'react'

type Timer = ReturnType<typeof setTimeout>

export default function useResize() {
  useEffect(() => {
    window.onresize = (() => {
      let timer: Timer | null
      return () => {
        if (timer) return
        timer = setTimeout(() => {
          console.log(window.innerWidth)
          clearTimeout(timer as Timer)
          timer = null
          if (window.innerWidth >= 1440) return
          throw new Error('The window width is too small.')
        }, 200)
      }
    })()
  }, [])
}
