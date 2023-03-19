import {
  Avatar,
  Icon,
  IconProps,
  ListItem,
  ListItemProps,
} from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import { useCallback } from 'react'

import { PalsContact } from '../types/PalsContact'

type Props = {
  item: Contact | PalsContact
  renderItemAccessoryRight?: ListItemProps['accessoryRight']
}

const ICON_SIZE = 32

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

  return (
    <ListItem
      title={item.name}
      accessoryLeft={renderItemAccessoryLeft}
      accessoryRight={renderItemAccessoryRight}
    />
  )
}

export default ContactListItem
