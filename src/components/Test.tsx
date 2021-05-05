import { FC, useState } from 'react'

import styled from 'styled-components'
import { mainTextColour } from 'theme'

import { Set } from 'types'

const Title = styled.h2`
  ${mainTextColour}
`

const Question = styled.p`
  ${mainTextColour}
`

const AnswerPrompt = styled.p`
  ${mainTextColour}
`
const Answer = styled.p`
  ${mainTextColour}
`

interface TestProps {
  set: Set
}

export const Test: FC<TestProps> = ({ set }) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const questions = set.questions.filter(
    (question) => question.learnt === undefined || !question.learnt
  )
  return (
    <>
      <Title>{set.title}</Title>
      <Question>{questions[0].question}</Question>
      {showAnswer ? (
        <Answer>{questions[0].answer}</Answer>
      ) : (
        <AnswerPrompt onClick={() => setShowAnswer(true)}>
          Show Answer
        </AnswerPrompt>
      )}
    </>
  )
}
