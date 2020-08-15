import { useEffect } from 'react'
import Head from 'next/head'
// import { useRouter } from 'next/router'
import AppLayout from 'components/AppLayout'
import { colors } from 'styles/theme'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'
import { loginWithGitHub } from 'firebase/client'
// import Avatar from 'components/Avatar'
import Logo from 'components/Icons/Logo'

import { useRouter } from 'next/router'
import useUser, { USER_STATE } from 'hooks/useUser'

// devit

export default function Home() {
  const user = useUser()
  // const router = useRouter();
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppLayout>
        <section>
          <Logo width='100' />
          {/* <img src='/devter-logo.png' alt='Logo'></img> */}
          <h1>Devter</h1>
          <h2>
            Hablar sobre desarrollo <br />
            con desarrolladores 👩‍💻👨‍💻
          </h2>
          <div>
            {console.log('usersss', user)}
            {user === USER_STATE.NO_LOGIADO && (
              <Button onClick={handleClick}>
                <GitHub fill='#fff' width={24} height={24} /> Login Con GitHub
              </Button>
            )}
            {user === USER_STATE.NO_SABEMOS && (
              <div>
                <span>Cargando...</span>
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        div {
          margin-top: 16px;
        }
        img {
          width: 100px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.secondary};
          font-size: 18px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
