import {
  Avatar,
  Icon,
  IconElement,
  IconProps,
  ListItem,
} from '@ui-kitten/components'
import { Contact } from 'expo-contacts'

type Props = {
  item: Contact
  renderItemRightAccessory?: IconProps
}

const ICON_SIZE = 32

const PersonIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="person" height={ICON_SIZE} width={ICON_SIZE} />
)

const ContactListItem = ({ item, renderItemRightAccessory }: Props) => {
  const { image = {} } = item
  const { uri = '' } = image
  const ItemAvatar = ({ style, ...rest }: IconProps) => (
    <Avatar
      {...rest}
      style={{
        ...style,
        tintColor: null,
        width: ICON_SIZE,
        height: ICON_SIZE,
      }}
      source={{ uri }}
    />
  )

  const AccessoryLeftComponent = uri ? ItemAvatar : PersonIcon

  return (
    <ListItem
      title={item.name}
      accessoryLeft={AccessoryLeftComponent}
      accessoryRight={renderItemRightAccessory}
    />
  )
}

export default ContactListItem
