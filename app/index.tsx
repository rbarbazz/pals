import { StyleSheet, Text, View } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Screen</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/index.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
