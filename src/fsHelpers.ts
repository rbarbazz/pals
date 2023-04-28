import * as FileSystem from 'expo-file-system'
import { Alert } from 'react-native'

import { getPalsContactsFromStorage } from './contactsHelpers'

export const exportPalsDataToFs = async () => {
  // TODO: iOS support
  try {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

    if (permissions.granted) {
      const uri = permissions.directoryUri
      const fileName = `palsDataExport-${new Date().toISOString()}.json`
      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        uri,
        fileName,
        'application/json',
      )

      await FileSystem.StorageAccessFramework.writeAsStringAsync(
        fileUri,
        JSON.stringify(await getPalsContactsFromStorage()),
      )

      Alert.alert(
        'Success',
        'Your data was successfully exported.',
        [{ text: 'OK' }],
        { cancelable: true },
      )
    }
  } catch {
    Alert.alert(
      'Error',
      'An error occurred while exporting your data.',
      [{ text: 'OK' }],
      { cancelable: true },
    )
  }
}
