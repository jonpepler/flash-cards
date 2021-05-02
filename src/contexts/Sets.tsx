import { createContext, FC } from 'react'
import { Set } from 'types'

const basicSetList: Set[] = [
  {
    title: 'Test Set 1',
    id: '1',
    questions: [
      {
        question: 'E=mc^2?',
        answer: 'yes'
      }
    ]
  },
  {
    title: 'Test Set 2',
    id: '2',
    questions: [
      {
        question: 'E=mc^2?',
        answer: 'yes'
      }
    ]
  }
]

interface SetsContextData {
  sets: Set[]
}

interface SetsProviderProps {
  value?: SetsContextData
}

export const SetsContext = createContext<SetsContextData>({ sets: [] })
export const SetsProvider: FC<SetsProviderProps> = ({ value, children }) => {
  // for dev only
  const sets = value?.sets ?? basicSetList
  return (
    <SetsContext.Provider value={{ sets }}>{children}</SetsContext.Provider>
  )
}
