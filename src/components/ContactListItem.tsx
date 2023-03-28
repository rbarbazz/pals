import {
  Avatar,
  Icon,
  IconProps,
  ListItem,
  ListItemProps,
  Text,
} from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'

import { PalsContact } from '../types/PalsContact'
import { formatLastInteractionTimestamp, isPalsContact } from '../utils'

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
  const nowTimestamp = new Date().getTime()
  const router = useRouter()
  const { image = {} } = item
  const { uri = '' } = image
  const renderItemAccessoryLeft = useCallback(
    (props: IconProps) =>
      uri ? (
        <Avatar
          {...props}
          source={{ uri }}
          style={[
            props.style,
            { height: ICON_SIZE, tintColor: null, width: ICON_SIZE },
          ]}
        />
      ) : (
        <Icon {...props} name="person" height={ICON_SIZE} width={ICON_SIZE} />
      ),
    [uri],
  )
  const additionalProps: Partial<ListItemProps> = {}

  if (
    isPalsContact(item) &&
    item.lastInteractionTimestamp &&
    item.lastInteractionTimestamp <= nowTimestamp
  ) {
    additionalProps.description = (
      <Text>
        Last in touch{' '}
        {formatLastInteractionTimestamp(item.lastInteractionTimestamp)}
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
      onPress={() => router.push(`/contact/${item.id}`)}
      title={item.name}
      {...additionalProps}
    />
  )
}

export default ContactListItem
