import React, { useEffect, useState } from 'react'

export default function useStatusEff<T>(
  state: T,
  cb?: Function,
  deps?: any[],
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [refExist, setRefExist] = useState<T>(state)

  useEffect(
    () => {
      if (cb) cb()
    },
    deps ? deps : [refExist],
  )

  return [refExist, setRefExist]
}
