import { Avatar, Layout, Text } from '@ui-kitten/components'
import { Image } from 'expo-contacts'
import { StyledComponent } from 'nativewind'

import { PalsContact } from '../../../types/PalsContact'

type TContactPageHeaderProps = {
  name: PalsContact['name']
  uri?: Image['uri']
}

const ContactPageHeader = ({ name, uri }: TContactPageHeaderProps) => (
  <StyledComponent component={Layout} className="mb-8 space-y-6 items-center">
    {uri && <Avatar source={{ uri }} size="giant" />}
    <Text>{name}</Text>
  </StyledComponent>
)

export default ContactPageHeader
