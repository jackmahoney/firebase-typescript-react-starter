import * as Firebase from "firebase";
import { UserData, DefaultUserData } from "./../models/UserData";
import { User } from "./../models/User";

import { Config } from "./../Config";

const firebaseApp = Firebase.initializeApp(Config.firebase);

const db = firebaseApp.database(); 
const auth = firebaseApp.auth();

const storageKey = Config.firebase.projectId;

const authProvider = new Firebase.auth.GoogleAuthProvider();

export function isAuthenticated(): boolean {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

export function openSigninPopup(): Promise<User> {
  return auth.signInWithPopup(authProvider).then(result => {
    // convert firebase user to a User model
    const firebaseUser  = <Firebase.User> result.user;
    const user: User = {
      name: firebaseUser.displayName,
      uid: firebaseUser.uid,
      image: firebaseUser.photoURL
    };
    // store the user in local storage
    window.localStorage.setItem(storageKey, JSON.stringify(user));

    return user;
  });
}

export function getUser(): User {
  const value = window.localStorage.getItem(storageKey);
  try {
    return <User>JSON.parse(value);
  } 
  catch (err) {
    console.warn(err);
    return null;
  }
};

function getRef(user: User): string {
  return 'users/' + user.uid;
}

export function getUserData(user: User): Promise<UserData> {
  return db.ref(getRef(user)).once('value').then(function(snapshot) {
      return <UserData> snapshot.val()
  });
};

export function updateUserData(user: User, callback: (userData: UserData) => UserData): Promise<any> {
  return getUserData(user)
  .then(userData => callback(userData ? userData : DefaultUserData))
  .then(userData => saveUserData(user, userData)); 
};

export function saveUserData(user: User, data: UserData): Promise<any> {
  return db.ref(getRef(user)).set(data);
};
