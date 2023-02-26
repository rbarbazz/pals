import { Icon } from '@ui-kitten/components'
import { ImageProps } from 'react-native'

const PersonAddIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="person-add" />
}

export default PersonAddIcon
