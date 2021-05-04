import { FC } from 'react'

import styled from 'styled-components'
import { mainTextColour } from 'theme'

import { Set } from 'types'

const Title = styled.h2`
  ${mainTextColour}
`

const Question = styled.p`
  ${mainTextColour}
`

interface TestProps {
  set: Set
}

export const Test: FC<TestProps> = ({ set }) => {
  const questions = set.questions.filter(
    (question) => question.learnt === undefined || !question.learnt
  )
  return (
    <>
      <Title>{set.title}</Title>
      <Question>{questions[0].question}</Question>
    </>
  )
}
