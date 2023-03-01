import { useTheme } from '@ui-kitten/components'
import { ReactNode } from 'react'
import {
  Platform,
  SafeAreaView as RNSafeAreaView,
  StatusBar,
} from 'react-native'

const SafeAreaView = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()

  return (
    <RNSafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme['background-basic-color-1'],
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      {children}
    </RNSafeAreaView>
  )
}

export default SafeAreaView
