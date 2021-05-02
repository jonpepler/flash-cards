import { FC } from 'react'

import styled from 'styled-components'

import { Set } from 'types'

import { Item } from './List/'

const SetList = styled.ul`
  padding: 0;
`

export interface ListProps {
  list: Set[]
  onSelect: (id: string) => void
}

export const List: FC<ListProps> = ({ list, onSelect }) => (
  <SetList>
    {list.map((set) => (
      <Item key={set.id} item={set} onSelect={() => onSelect(set.id)} />
    ))}
  </SetList>
)
