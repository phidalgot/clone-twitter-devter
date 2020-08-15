import { useEffect, useState } from 'react'

import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import styles from './styles.module.css'
import useUser from 'hooks/useUser'
import { fetchLatesDevits } from 'firebase/client'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    console.log('entro a buscar', user)
    user &&
      fetchLatesDevits().then((timeline) => {
        setTimeline(timeline)
      })
    // fetch('/api/statuses/home_timeline')
    // .then((res) => res.json())
  }, [user])

  return (
    <>
      <AppLayout>
        <div>
          <header className={styles.header}>
            <h2 className={styles.h2}>Inicio</h2>
          </header>
          <section className={styles.section}>
            {timeline.map(({ id, userName, avatar, content, userId, createdAt }) => (
              <Devit
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                key={id}
                content={content}
                userName={userName}
                userId={userId}
              />
            ))}
          </section>
          <nav className={styles.nav}></nav>
        </div>
      </AppLayout>
    </>
  )
}
//   quede en el minuto 1.46:33
