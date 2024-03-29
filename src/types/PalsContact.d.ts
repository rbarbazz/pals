import { Contact } from 'expo-contacts'

export type PalsContactListName = 'Family' | 'Friends'

export type Interaction = {
  id: string
  timestamp: number
  type: '' | 'call' | 'in-person'
  notes?: string
}

export interface PalsContact extends Pick<Contact, 'id' | 'name' | 'image'> {
  interactions: Interaction[]
  listName: PalsContactListName
}
