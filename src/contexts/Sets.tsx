import { useStateWithIdb } from 'hooks'
import { createContext, useContext, FC, useState } from 'react'
import { Question, Set } from 'types'

// Shamelessly stolen for dev work from https://github.com/Amalazing/React-Quiz/blob/master/src/Questions/science-questions.json
const basicSetList: Set[] = [
  {
    title: 'Test Set 1',
    id: '1',
    questions: [
      {
        question: 'What is the biggest planet in our solar system?',
        answer: 'Jupiter'
      },
      {
        question: 'The fear of what animal is arachnophobia?',
        answer: 'Spiders'
      },
      {
        question:
          'What famous scientist was awarded the 1921 Nobel Prize in Physics for his work on theoretical physics?',
        answer: 'Albert Einstein'
      },
      {
        question: 'Pure water has a PH of about',
        answer: '7.0'
      },
      {
        question: 'What is the highest mountian on Earth?',
        answer: 'Mount Everest'
      },
      {
        question:
          'What is the name of the long appendage that hangs off an elephants face?',
        answer: 'Trunk'
      },
      {
        question: 'Where can flamingos NOT be found?',
        answer: 'Northern Europe'
      },
      {
        question: 'What compound makes plants green?',
        answer: 'Chlorophyll'
      },
      {
        question:
          'What is the name of the star closest to earth besides the sun?',
        answer: 'Alpha Centauri'
      },
      {
        question: 'Molten rock that comes out of a volcano is known as what?',
        answer: 'Lava'
      }
    ]
  },
  {
    title: 'Test Set 2!',
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
  setTestResults: (id: string, questions: Question[]) => void
  saving: boolean
}

interface SetsProviderProps {
  value?: SetsContextData
}

const SetsContext = createContext<SetsContextData | undefined>(undefined)
export const SetsProvider: FC<SetsProviderProps> = ({ value, children }) => {
  const [saving, setSaving] = useState<boolean>(false)
  const [sets, updateSets] = useStateWithIdb<Set[]>(
    'sets',
    // for dev only
    value?.sets ?? basicSetList,
    () => setSaving(false)
  )

  const setTestResults: SetsContextData['setTestResults'] = (id, questions) => {
    const testIndex = sets.findIndex((set) => set.id === id)
    const newSets = [...sets]
    newSets[testIndex] = { ...newSets[testIndex], questions }
    setSaving(true)
    updateSets(newSets)
  }

  return (
    <SetsContext.Provider value={{ sets, setTestResults, saving }}>
      {children}
    </SetsContext.Provider>
  )
}
export const useSets = (): SetsContextData => {
  const context = useContext(SetsContext)
  if (context === undefined) {
    throw new Error('useSets must be used within a SetsProvider')
  }
  return context
}
