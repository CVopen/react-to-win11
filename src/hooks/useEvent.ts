/* eslint-disable no-undef */
import { useEffect } from 'react'

export default function useEvent<K extends keyof WindowEventMap>({
  cb,
  eventName,
}: {
  cb: (e: WindowEventMap[K]) => void
  eventName: K
}) {
  useEffect(() => {
    window.addEventListener(eventName, cb)
    return () => {
      console.log(123)
      window.removeEventListener(eventName, cb)
    }
  }, [])
}
