import { Layout, Text } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

const styledTextProps = {
  appearance: 'hint',
  className: 'text-center',
  component: Text,
}

export default function MainScreen() {
  return (
    <StyledComponent
      component={Layout}
      className="flex-1 justify-center items-center"
    >
      <StyledComponent component={Layout} className="m-12 space-y-6">
        <StyledComponent {...styledTextProps}>
          You haven't imported any contacts yet.
        </StyledComponent>
        <StyledComponent {...styledTextProps}>
          Start by clicking the button in the top right corner.
        </StyledComponent>
      </StyledComponent>
    </StyledComponent>
  )
}
