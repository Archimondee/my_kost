import AsyncStorage from '@react-native-community/async-storage';

export const getItem = async (item: any) => {
  try {
    const value = await AsyncStorage.getItem(item);
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};

export const setItem = async (item: any, value: any) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (error) {
    console.log('SetItem error ', error);
    return null;
  }
};
