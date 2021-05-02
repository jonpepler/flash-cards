import { FC } from 'react'
import { Set } from 'types'

interface TestProps {
  set: Set
}

export const Test: FC<TestProps> = ({ set }) => {
  const questions = set.questions
  return (
    <>
      <h2>Taking a test</h2>
      <div>{questions[0].question}</div>
    </>
  )
}
