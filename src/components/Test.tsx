import { FC } from 'react'
import { Set } from 'types'

interface TestProps {
  set: Set
}

export const Test: FC<TestProps> = ({ set }) => {
  const questions = set.questions.filter(
    (question) => question.learnt === undefined || !question.learnt
  )
  return (
    <>
      <h2>{set.title}</h2>
      <div>{questions[0].question}</div>
    </>
  )
}
