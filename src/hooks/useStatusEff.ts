import React, { useEffect, useState } from 'react'

export default function useStatusEff<T>(
  state: T,
  deps: any[] = [],
  cb?: Function,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [refExist, setRefExist] = useState<T>(state)

  useEffect(() => {
    if (cb) cb()
  }, deps)

  return [refExist, setRefExist]
}
