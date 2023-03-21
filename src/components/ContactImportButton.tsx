import { Button, Icon, Layout } from '@ui-kitten/components'
import { useRouter } from 'expo-router'
import { StyledComponent } from 'nativewind'

const ContactImportButton = () => {
  const router = useRouter()

  return (
    <StyledComponent className="absolute bottom-8 right-8" component={Layout}>
      <Button
        accessoryRight={(props) => <Icon {...props} name="person-add" />}
        onPress={() => router.push('/contact-import')}
      >
        Add
      </Button>
    </StyledComponent>
  )
}

export default ContactImportButton
