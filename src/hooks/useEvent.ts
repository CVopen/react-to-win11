import { useEffect } from 'react'

export default function useEvent() {
  useEffect(() => {
    console.log('start')
    return () => {
      console.log('end')
    }
  }, [])
}
