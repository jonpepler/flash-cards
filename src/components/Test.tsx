import { FC, useEffect, useMemo, useState } from 'react'

import styled from 'styled-components'
import { mainTextColour } from 'theme'

import { Set, Question } from 'types'

const Title = styled.h2`
  ${mainTextColour}
`

const QuestionText = styled.p`
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

interface indexedQuestion extends Question {
  id: number
}

const indexQuestions = (questions: Question[]): indexedQuestion[] =>
  questions.map((q, index) => ({ ...q, id: index }))

export const Test: FC<TestProps> = ({ set }) => {
  const [questions, setQuestions] = useState<indexedQuestion[]>(
    indexQuestions(set.questions)
  )
  const [filteredQuestions, setFilteredQuestions] = useState<indexedQuestion[]>(
    questions
  )
  const allQuestionsAnswered = useMemo(() => filteredQuestions.length === 0, [
    filteredQuestions
  ])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [currentQuestion, setCurrentQuestion] = useState<indexedQuestion>(
    filteredQuestions[currentQuestionIndex]
  )
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  useEffect(() => {
    const nextQuestion = filteredQuestions.find(
      (q) => q.id === currentQuestionIndex
    ) as indexedQuestion // this should never return undefined
    setCurrentQuestion(nextQuestion)
  }, [currentQuestionIndex])

  useEffect(() => {
    const truthy = (nullableValue: boolean | undefined): boolean =>
      nullableValue ?? false
    setFilteredQuestions(questions.filter((q) => !truthy(q.answered)))
  }, [questions])

  const answerQuestion = (learnt: boolean): void => {
    setShowAnswer(false)
    setQuestions([
      ...questions.slice(0, currentQuestionIndex),
      { ...currentQuestion, answered: true, learnt },
      ...questions.slice(currentQuestionIndex + 1, questions.length)
    ])
    setNextQuestion()
  }

  const setNextQuestion = (): void => {
    const idsOnly = (fq: indexedQuestion): number => fq.id
    const higherIndex = Math.min(
      ...filteredQuestions
        .filter((fq) => fq.id > currentQuestionIndex)
        .map(idsOnly)
    )
    setCurrentQuestionIndex(
      higherIndex === Infinity
        ? Math.min(...filteredQuestions.map(idsOnly))
        : higherIndex
    )
  }

  return (
    <>
      <Title>{set.title}</Title>
      {!allQuestionsAnswered ? (
        <>
          <QuestionText>{currentQuestion.question}</QuestionText>
          {showAnswer ? (
            <>
              <Answer>{currentQuestion.answer}</Answer>
              <p>Were you correct?</p>
              <button onClick={() => answerQuestion(true)}>Correct</button>
              <button onClick={() => answerQuestion(false)}>Incorrect</button>
            </>
          ) : (
            <>
              <AnswerPrompt onClick={() => setShowAnswer(true)}>
                Show Answer
              </AnswerPrompt>
              <button onClick={setNextQuestion}>Next Card</button>
            </>
          )}
        </>
      ) : (
        <div>No more questions!</div>
      )}
    </>
  )
}
