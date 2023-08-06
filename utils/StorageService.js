import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageKeys = {
    APP_LANGUAGE: 'APP_LANGUAGE',
    USER: '@user',
    SHOW_FULL_ADD: 'SHOW_FULL_ADD',
    POWERBALL_NUMBERS: '@POWERBALL_NUMBERS'
}

async function getItem(key) {
    return AsyncStorage.getItem(key)
        .then((value) => {
            if (value !== null) {
                return JSON.parse(value);
            }
            return null;
        })
        .catch((error) => {
            // Handle error, e.g., logging or showing an error message
            console.error('Error getting item from AsyncStorage:', error);
            return null;
        });
}

function saveItem(key, item) {
    return AsyncStorage
        .setItem(key, JSON.stringify(item))
        .then((value) => item);
}

function clear() {
    return AsyncStorage.clear();
}

function deleteItem(key) {
    return AsyncStorage.removeItem(key);
}

const StorageService = {
    ...StorageKeys,
    getItem,
    saveItem,
    clear,
    deleteItem,
}

export default StorageService;