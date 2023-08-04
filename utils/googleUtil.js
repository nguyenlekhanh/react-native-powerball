// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GoogleSignin,
    statusCodes,
    User,
} from '@react-native-google-signin/google-signin';

import {
    googleAndroidClientId,
    googleIosClientId
  } from './variables';
import StorageService from './StorageService';

GoogleSignin.configure({
    androidClientId: {googleAndroidClientId},
    iosClientId: {googleIosClientId},
});

const saveGoogleUserToStore = async (googleUserInfo) => {
    await StorageService.saveItem(StorageService.USER, JSON.stringify(googleUserInfo));
}

export const googleSignIn = async (setUser) => {
    //Another to sign in
    await GoogleSignin.hasPlayServices();
    const googleUserInfo = await GoogleSignin.signIn();
    if(googleUserInfo) {
        await StorageService.saveItem(StorageService.USER, JSON.stringify(googleUserInfo));
        setUser(googleUserInfo);
    }

    // GoogleSignin.hasPlayServices().then((hasPlayService) => {
    //     if (hasPlayService) {
    //         GoogleSignin.signIn().then((googleUserInfo) => {
    //           saveGoogleUserToStore(googleUserInfo);
    //           //setUser(googleUserInfo);
    //           //StorageService.saveItem(StorageService.USER, JSON.stringify(googleUserInfo));
    //         }).catch((e) => {
    //           console.log("ERROR IS: " + JSON.stringify(e));
    //         })
    //     }
    // }).catch((e) => {
    //     console.log("ERROR IS: " + JSON.stringify(e));
    // })
}

export const getGoogleUser = async (setUser) => {
    try {
        const user = await StorageService.getItem(StorageService.USER);
        if(!user) {
            const googleUserInfo = await GoogleSignin.signInSilently();
            setUser(googleUserInfo);
            StorageService.saveItem(StorageService.USER, JSON.stringify(googleUserInfo));
        } else {
            setUser(JSON.parse(user));
        }
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // user has not signed in yet
        } else {
            // some other error
        }
    }
}

export const googleSignOut = async (setUser) => {
    try {
        await StorageService.deleteItem(StorageService.USER);
        setUser('');
        await GoogleSignin.signOut();
    } catch (error) {
        console.error(error);
    }
}

// export const getUserInfo = async (token, setUserInfo) => {
//     if(!token) return;
//     try {
//         const response = await fetch(
//             "https://www.googleapis.com/userinfo/v2/me",
//             {
//                 headers: { Authorization: `Bearer ${token}` }
//             }
//         )
//         const user = await response.json();
//         await AsyncStorage.setItem("@user", JSON.stringify(user));
//         setUserInfo(user);
//     } catch(error) {

//     }
// }