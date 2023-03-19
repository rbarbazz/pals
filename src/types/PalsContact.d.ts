import { Contact } from 'expo-contacts'

export interface PalsContact extends Pick<Contact, 'id' | 'name' | 'image'> {
  lastInteractionDate: string
  lastInteractionType: '' | 'call' | 'message' | 'in-person'
}
