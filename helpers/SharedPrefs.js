import AsyncStorage from '@react-native-community/async-storage'

export default SharedPrefs = {

    storeData:  async (key, value) => {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    },

    retrieveData: async (key) => {
        const val = await AsyncStorage.getItem(key)
        const item = JSON.parse(val)
        return item;
    },
    clear: async () => {
        await AsyncStorage.clear()
    }
}
