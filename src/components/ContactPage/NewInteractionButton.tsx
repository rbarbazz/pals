import { Button, ButtonProps, Icon, Layout } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

const NewInteractionButton = ({
  onPress,
}: {
  onPress: ButtonProps['onPress']
}) => (
  <StyledComponent className="absolute bottom-8 right-8" component={Layout}>
    <Button
      accessoryRight={(props) => <Icon {...props} name="calendar" />}
      onPress={onPress}
    />
  </StyledComponent>
)

export default NewInteractionButton
