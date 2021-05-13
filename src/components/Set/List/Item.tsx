import { FC, useEffect, useMemo, useState } from 'react'

import styled from 'styled-components'

import { Set } from 'types'

const ItemContainer = styled.div`
  background-color: ${(props) => props.theme.mainTextColour};
  padding: 15px;
  border-radius: 10px;
  font-weight: bolder;
  box-shadow: 0px 4px #4c4c4c;
  cursor: pointer;
  margin-bottom: 15px;

  max-width: 500px;
`

const pNoMargin = styled.p`
  margin: 0;
`

const Title = styled(pNoMargin)``

const LearntMeter = styled(pNoMargin)`
  text-align: right;
  font-size: 12px;
`

export interface ItemProps {
  item: Set
  onSelect: () => void
}

export const Item: FC<ItemProps> = ({ item, onSelect }) => {
  const [percentageLearnt, setPercentageLearnt] = useState<number>(0)
  const percentageLearntString = useMemo(() => `${percentageLearnt}% learnt`, [
    percentageLearnt
  ])

  useEffect(() => {
    setPercentageLearnt(
      (item.questions.filter((q) => q.learnt).length / item.questions.length) *
        100
    )
  }, [item.questions])

  return (
    <ItemContainer key={item.id} onClick={onSelect}>
      <Title>{item.title}</Title>
      <LearntMeter>{percentageLearntString}</LearntMeter>
    </ItemContainer>
  )
}
