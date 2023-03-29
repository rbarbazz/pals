import { Contact } from 'expo-contacts'

export interface PalsContact extends Pick<Contact, 'id' | 'name' | 'image'> {
  lastInteractionTimestamp?: number
  lastInteractionType: '' | 'call' | 'in-person'
}
