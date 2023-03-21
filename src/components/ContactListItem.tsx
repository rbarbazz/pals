import {
  Avatar,
  Icon,
  IconProps,
  ListItem,
  ListItemProps,
  Text,
} from '@ui-kitten/components'
import { formatDistanceToNow } from 'date-fns'
import { Contact } from 'expo-contacts'
import { useCallback } from 'react'

import { PalsContact } from '../types/PalsContact'
import { isPalsContact } from '../utils'

type Props = {
  item: Contact | PalsContact
  renderItemAccessoryRight?: ListItemProps['accessoryRight']
}

const ICON_SIZE = 32
const ONE_MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30

const getLastInteractionIcon = (interactionTimestamp: number) => {
  const now = Date.now()

  if (ONE_MONTH_IN_MS < now - interactionTimestamp) {
    return (props: IconProps) => <Icon {...props} name="alert-triangle" />
  }

  return undefined
}

const ContactListItem = ({ item, renderItemAccessoryRight }: Props) => {
  const { image = {} } = item
  const { uri = '' } = image
  const renderItemAccessoryLeft = useCallback(
    (props: IconProps) =>
      uri ? (
        <Avatar
          {...props}
          style={{
            ...props.style,
            tintColor: null,
            width: ICON_SIZE,
            height: ICON_SIZE,
          }}
          source={{ uri }}
        />
      ) : (
        <Icon {...props} name="person" height={ICON_SIZE} width={ICON_SIZE} />
      ),
    [uri],
  )
  const additionalProps: Partial<ListItemProps> = {}

  if (isPalsContact(item) && item.lastInteractionTimestamp) {
    additionalProps.description = (
      <Text>
        {formatDistanceToNow(new Date(item.lastInteractionTimestamp), {
          addSuffix: true,
        })}
      </Text>
    )
    additionalProps.accessoryRight = getLastInteractionIcon(
      item.lastInteractionTimestamp,
    )
  }

  return (
    <ListItem
      accessoryLeft={renderItemAccessoryLeft}
      accessoryRight={renderItemAccessoryRight}
      title={item.name}
      {...additionalProps}
    />
  )
}

export default ContactListItem
