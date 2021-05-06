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
  const [currentQuestionIndex, setQuestionIndex] = useState<number>(0)

  const setNextQuestion = (): void => {
    setQuestionIndex(
      currentQuestionIndex + 1 >= questions.length
        ? 0
        : currentQuestionIndex + 1
    )
  }

  return (
    <>
      <Title>{set.title}</Title>
      <Question>{questions[currentQuestionIndex].question}</Question>
      {showAnswer ? (
        <Answer>{questions[currentQuestionIndex].answer}</Answer>
      ) : (
        <AnswerPrompt onClick={() => setShowAnswer(true)}>
          Show Answer
        </AnswerPrompt>
      )}
      <button onClick={setNextQuestion}>Next Card</button>
    </>
  )
}
