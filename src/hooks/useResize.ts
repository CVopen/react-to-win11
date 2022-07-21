import { Timer } from '@/utils'
import { useCallback, useEffect, useState } from 'react'

export default function useResize() {
  const [error, setError] = useState(false)

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

  useEffect(() => {
    if (!error) return
    setError(false)
  }, [error])

  function Bomb() {
    if (!error) return null
    throw new Error('The window width is too small.')
  }

  const handleError = useCallback(() => {
    if (window.innerWidth >= 1440 && window.innerHeight >= 650) return
    setError(true)
  }, [])

  return Bomb
}
