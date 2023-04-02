import { Contact } from 'expo-contacts'

export type Interaction = {
  timestamp: number
  type: '' | 'call' | 'in-person'
  notes: string
}

export interface PalsContact extends Pick<Contact, 'id' | 'name' | 'image'> {
  interactions: Interaction[]
}
