import React, { FC } from 'react'

import { render, RenderResult } from '@testing-library/react'

import { useSets } from 'contexts'

describe('useSearchTerms', () => {
  it('throws an error when used without a context provider', () => {
    // silence errors
    const consoleError = console.error
    console.error = jest.fn()

    const FakeComponent: FC = () => {
      const { saving } = useSets()
      return <div>{saving}</div>
    }
    const renderFakeComponent = (): RenderResult => render(<FakeComponent />)
    expect(renderFakeComponent).toThrow(
      'useSets must be used within a SetsProvider'
    )

    console.error = consoleError
  })
})
