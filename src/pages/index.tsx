import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import PhotoGrid from '@/components/SearchPanel'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Image Search Grid - Unsplash API</title>
        <meta name="description" content="Image search component with Material UI masonry layout and Unsplash API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <PhotoGrid />
      </main>
    </>
  )
}
