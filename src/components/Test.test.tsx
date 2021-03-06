import {
  render,
  RenderResult,
  waitForElementToBeRemoved
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SetsProvider } from 'contexts'

import { Set } from 'types'

import { Test } from './Test'

const singleQuestionSetWithNoLearnt: Set = {
  title: 'singleQuestionSet',
  id: '1',
  questions: [{ question: 'Q', answer: 'A' }],
  fixedOrder: true
}

const singleUnlearntQuestionSet: Set = {
  title: 'singleQuestionSet',
  id: '1',
  questions: [{ question: 'Q', answer: 'A', learnt: false }],
  fixedOrder: true
}

const setQuestionMatcher = /Q[1-3]/
const set: Set = {
  title: 'questions',
  id: '1',
  questions: [
    { question: 'Q1', answer: 'A1', learnt: false },
    { question: 'Q2', answer: 'A2', learnt: false },
    { question: 'Q3', answer: 'A3', learnt: false }
  ],
  fixedOrder: true
}
const randomOrderSet = { ...set, fixedOrder: false }

const renderTestWithContext = (set: Set): RenderResult =>
  render(
    <SetsProvider>
      <Test set={set} exit={() => null} />
    </SetsProvider>
  )

describe('shows an unlearnt question', () => {
  test('when the learnt property has not been set', async () => {
    const onlyPossibleQuestion =
      singleQuestionSetWithNoLearnt.questions[0].question
    const { getByText } = renderTestWithContext(singleQuestionSetWithNoLearnt)
    expect(
      getByText(new RegExp(`^${onlyPossibleQuestion}$`))
    ).toBeInTheDocument()
  })

  test('when the learnt property has been set as false', async () => {
    const onlyPossibleQuestion = singleUnlearntQuestionSet.questions[0].question
    const { getByText } = renderTestWithContext(singleUnlearntQuestionSet)
    expect(
      getByText(new RegExp(`^${onlyPossibleQuestion}$`))
    ).toBeInTheDocument()
  })
})

it("shows the current question's answer when prompted", async () => {
  const { getByText } = renderTestWithContext(singleUnlearntQuestionSet)
  userEvent.click(getByText(/Show Answer/))
  expect(
    getByText(singleUnlearntQuestionSet.questions[0].answer)
  ).toBeInTheDocument()
})

it('shows the next question when prompted', async () => {
  const { getByText } = renderTestWithContext(set)
  const currentQuestion = getByText(setQuestionMatcher).textContent
  userEvent.click(getByText(/Next Card/))
  const newQuestion = getByText(setQuestionMatcher).textContent
  expect(currentQuestion).not.toEqual(newQuestion)
})

it('loops round all possible questions', async () => {
  const { getByText } = renderTestWithContext(set)
  const firstQuestion = getByText(setQuestionMatcher).textContent
  set.questions.forEach(() => userEvent.click(getByText(/Next Card/)))
  expect(getByText(setQuestionMatcher).textContent).toEqual(firstQuestion)
})

describe('after showing the answer', () => {
  it('prompts the user to state if they got the question right', async () => {
    const { getByText, getByRole } = renderTestWithContext(set)
    userEvent.click(getByText(/Show Answer/))
    expect(getByText(/Were you correct?/)).toBeInTheDocument()
    expect(getByRole('button', { name: 'Correct' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'Incorrect' })).toBeInTheDocument()
  })

  it('goes to the next question when the user clicks correct', async () => {
    const { getByText, queryByText, getByRole } = renderTestWithContext(set)
    const firstQuestion = getByText(setQuestionMatcher).textContent
    userEvent.click(getByText(/Show Answer/))
    userEvent.click(getByRole('button', { name: 'Correct' }))
    const newQuestion = getByText(setQuestionMatcher).textContent
    expect(firstQuestion).not.toEqual(newQuestion)
    expect(queryByText(/Were you correct?/)).not.toBeInTheDocument()
  })

  it('goes to the next question when the user clicks incorrect', async () => {
    const { getByText, queryByText, getByRole } = renderTestWithContext(set)
    const firstQuestion = getByText(setQuestionMatcher).textContent
    userEvent.click(getByText(/Show Answer/))
    userEvent.click(getByRole('button', { name: 'Incorrect' }))
    const newQuestion = getByText(setQuestionMatcher).textContent
    expect(firstQuestion).not.toEqual(newQuestion)
    expect(queryByText(/Were you correct?/)).not.toBeInTheDocument()
  })

  describe('after answering a question correct or incorrect', () => {
    it("doesn't show the question again", async () => {
      const { getByText } = renderTestWithContext(set)
      const firstQuestion = getByText(setQuestionMatcher).textContent
      userEvent.click(getByText(/Show Answer/))
      userEvent.click(getByText(/Correct/))
      set.questions
        .slice(1, set.questions.length)
        .forEach(() => userEvent.click(getByText(/Next Card/)))
      expect(getByText(setQuestionMatcher).textContent).not.toEqual(
        firstQuestion
      )
    })

    describe('if no more questions are left', () => {
      it("tells the user they've been through all the cards", async () => {
        const { getByText, queryByText } = renderTestWithContext(
          singleUnlearntQuestionSet
        )
        userEvent.click(getByText(/Show Answer/))
        userEvent.click(getByText(/Correct/))

        await waitForElementToBeRemoved(() => queryByText(/Saving.../))

        expect(getByText(/No more questions!/)).toBeInTheDocument()
      })
    })
  })
})

it('can show questions in a random order', async () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.1)
  const { getByText } = renderTestWithContext(randomOrderSet)
  expect(getByText(setQuestionMatcher).textContent).not.toEqual(
    randomOrderSet.questions[0].question
  )
  jest.spyOn(global.Math, 'random').mockRestore()
})
