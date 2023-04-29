import { formatDistance, isToday, startOfToday } from 'date-fns'
import { Contact } from 'expo-contacts'
import * as yup from 'yup'

import { PalsContact } from './types/PalsContact'

export const isPalsContact = (
  contact: Contact | PalsContact,
): contact is PalsContact => (contact as PalsContact).interactions !== undefined

const interactionSchema = yup.object().shape({
  id: yup.string().required(),
  timestamp: yup.number().required(),
  type: yup.mixed().oneOf(['', 'call', 'in-person']).required(),
  notes: yup.string(),
})

const palsContactSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  image: yup.object(),
  interactions: yup.array().of(interactionSchema).required(),
})

export const validatePalsContacts = (contacts: any) =>
  yup.array().of(palsContactSchema).validateSync(contacts)

export const timestampToRelativeTime = (timestamp: number) => {
  const date = new Date(timestamp)

  return isToday(date)
    ? 'today'
    : formatDistance(date, startOfToday(), {
        addSuffix: true,
      })
}
