import { Contact } from 'expo-contacts'

import { PalsContact } from './types/PalsContact'

export const isPalsContact = (
  contact: Contact | PalsContact,
): contact is PalsContact =>
  (contact as PalsContact).lastInteractionType !== undefined
