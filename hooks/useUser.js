import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/client'
import { useRouter } from 'next/router'

export const USER_STATE = {
  NO_LOGIADO: null,
  NO_SABEMOS: undefined,
}
export default function useUser() {
  const [user, setUser] = useState(USER_STATE.NO_SABEMOS)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATE.NO_LOGIADO && router.push('/')
  }, [user])

  return user
}
