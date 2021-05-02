import { SetList, Test } from 'components'
import { SetsContext } from 'contexts/Sets'
import { FC, useContext, useEffect, useState } from 'react'
import { Set } from 'types'
import './App.css'

export const App: FC = () => {
  const { sets } = useContext(SetsContext)
  const [setDisplayId, updateSetDisplayId] = useState<string | null>(null)
  const [testSet, updateTestSet] = useState<Set | null>(null)

  useEffect(() => {
    const newTestSet = sets.find((set) => set.id === setDisplayId)
    updateTestSet(newTestSet !== undefined ? newTestSet : null)
  }, [setDisplayId])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Flash Cards</h1>
      </header>
      <main>
        {testSet === null ? (
          <SetList list={sets} onSelect={(id) => updateSetDisplayId(id)} />
        ) : (
          <Test set={testSet}></Test>
        )}
      </main>
    </div>
  )
}
