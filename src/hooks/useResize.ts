import { useCallback, useEffect } from 'react'

type Timer = ReturnType<typeof setTimeout>

export default function useResize() {
  useEffect(() => {
    window.onresize = (() => {
      let timer: Timer | null
      return () => {
        if (timer) return
        timer = setTimeout(() => {
          clearTimeout(timer as Timer)
          timer = null
          handleError()
        }, 200)
      }
    })()
    handleError()
  }, [])

  const handleError = useCallback(() => {
    if (window.innerWidth >= 1440) return
    throw new Error('The window width is too small.')
  }, [])
}
