import { createContext, FC } from 'react'
import { Set } from 'types'

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
