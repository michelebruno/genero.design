import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from './page.module.css'

import Logo from '../svg/logo.svg'


const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <main className={styles.main}>
      <Logo className={styles.svg} />
    </main>
  )
}
