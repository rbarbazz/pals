import { Contact } from 'expo-contacts'

export type Interaction = {
  lastInteractionTimestamp: number
  lastInteractionType: '' | 'call' | 'in-person'
  lastInteractionNote: string
}

export interface PalsContact extends Pick<Contact, 'id' | 'name' | 'image'> {
  interactions: Interaction[]
}
