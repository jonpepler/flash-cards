import { Question } from './Question'

export interface Set {
  title: string
  id: string
  questions: Question[]
  fixedOrder?: boolean
}
