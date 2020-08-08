import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAwytYeyRtH2eDhFKg8PWxUr4p-dTjki44",
  authDomain: "devter-5441b.firebaseapp.com",
  databaseURL: "https://devter-5441b.firebaseio.com",
  projectId: "devter-5441b",
  storageBucket: "devter-5441b.appspot.com",
  messagingSenderId: "278978926439",
  appId: "1:278978926439:web:c3c2b12930a2a9634b81c2",
  measurementId: "G-BH37S505ZM",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  console.log("User:", user);
  const { displayName, email, photoURL } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const onAuthStateChanged = (onChange) => {
  // user ? true : false

  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};
