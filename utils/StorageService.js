import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageKeys = {
    APP_LANGUAGE: 'APP_LANGUAGE',
    USER: '@user',
    SHOW_FULL_ADD: 'SHOW_FULL_ADD'
}

async function getItem(key) {
    const data = await AsyncStorage.getItem(key);
    let parseData = '';
    if(data) {
        parseData = JSON.parse(data);
    }
    return parseData;
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