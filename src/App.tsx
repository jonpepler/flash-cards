import { List as FlashCardList } from 'components/FlashCard'
import { FC } from 'react'
import { Set } from 'types'
import './App.css'

const basicSetList: Set[] = [
  {
    title: 'Test Set',
    id: '1'
  },
  {
    title: 'Test Set 2',
    id: '2'
  }
]

export const App: FC = () => (
  <div className="app">
    <header className="app-header">
      <h1>Flash Cards</h1>
    </header>
    <main>
      <FlashCardList list={basicSetList} />
    </main>
  </div>
)
