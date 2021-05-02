import { FC } from 'react'

import styled from 'styled-components'

import { Set } from 'types'

const Title = styled.p`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  font-weight: bolder;
  box-shadow: 0px 4px #4c4c4c;
  cursor: pointer;

  max-width: 500px;
`

export interface ItemProps {
  item: Set
  onSelect: () => void
}

export const Item: FC<ItemProps> = ({ item, onSelect }) => (
  <Title key={item.id} onClick={onSelect}>
    {item.title}
  </Title>
)
