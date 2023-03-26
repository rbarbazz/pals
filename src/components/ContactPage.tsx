import {
  Avatar,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'expo-router'
import { StyledComponent } from 'nativewind'

import { PalsContact } from '../types/PalsContact'

type TContactPageProps = PalsContact

const ContactPage = ({
  lastInteractionTimestamp,
  name,
  image = {},
}: TContactPageProps) => {
  const router = useRouter()
  const { uri = '' } = image

  return (
    <>
      <TopNavigation
        accessoryLeft={
          <TopNavigationAction
            icon={(props) => <Icon {...props} name="arrow-back" />}
            onPress={() => router.back()}
          />
        }
        alignment="center"
      />
      <Divider />
      <StyledComponent
        component={Layout}
        className="flex-1 space-y-6 p-12 items-center"
      >
        {uri && <Avatar source={{ uri }} size="giant" />}
        <StyledComponent
          component={Layout}
          className="flex-1 space-y-3 items-center"
        >
          <Text>{name}</Text>
          {lastInteractionTimestamp && (
            <Text appearance="hint">
              Last in touch{' '}
              {formatDistanceToNow(new Date(lastInteractionTimestamp), {
                addSuffix: true,
              })}
            </Text>
          )}
        </StyledComponent>
      </StyledComponent>
    </>
  )
}

export default ContactPage
