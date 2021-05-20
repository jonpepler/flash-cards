import React, { useState, useEffect } from 'react'
import { get, set } from 'idb-keyval'

export const useStateWithIdb = <T>(
  key: IDBValidKey,
  initialValue: T,
  onSave: () => void
): [T, React.Dispatch<T>] => {
  const [value, setValue] = useState(initialValue)

  // get stored data on first load
  useEffect(() => {
    let mounted = true
    const getData = async (): Promise<void> => {
      const newValue = await get(key)
      if (newValue !== undefined && mounted) {
        setValue(newValue)
      }
    }
    void getData()
    return () => {
      mounted = false
    }
  }, [key])

  return [
    value,
    async (value) => {
      await set(key, value)
      setValue(value)
      onSave()
    }
  ]
}
