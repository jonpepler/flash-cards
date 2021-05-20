import { SetList, Test } from 'components'
import { useSets } from 'contexts'
import { FC, useEffect, useState } from 'react'
import { Set } from 'types'
import './App.css'

export const App: FC = () => {
  const { sets } = useSets()
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
          <Test set={testSet} exit={() => updateSetDisplayId(null)}></Test>
        )}
      </main>
    </div>
  )
}
