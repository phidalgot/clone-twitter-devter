import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAwytYeyRtH2eDhFKg8PWxUr4p-dTjki44',
  authDomain: 'devter-5441b.firebaseapp.com',
  databaseURL: 'https://devter-5441b.firebaseio.com',
  projectId: 'devter-5441b',
  storageBucket: 'devter-5441b.appspot.com',
  messagingSenderId: '278978926439',
  appId: '1:278978926439:web:c3c2b12930a2a9634b81c2',
  measurementId: 'G-BH37S505ZM',
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  console.log('User viene de client:', user)
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  // user ? true : false

  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}
export const fetchLatesDevits = () => {
  return db
    .collection('devits')
    .get()
    .then(({ docs }) => {
      console.log('snapshot:', docs)
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        const intl = new Intl.DateTimeFormat('es-ES')
        const nonormalizedcreatedAt = intl.format(
          new Date(createdAt.seconds * 1000)
        )
        return { ...data, id, createdAt: nonormalizedcreatedAt }
      })
    })
}
