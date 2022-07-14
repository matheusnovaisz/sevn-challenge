import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Post } from '../utils/interfaces/Post.interface'

interface HomePageProps{
  mainNews: Post[],
  secondaryNews: Post[]
}

const Home: NextPage<HomePageProps> = ({mainNews, secondaryNews}) => {
  console.log(mainNews)
  console.log(secondaryNews)
  return (
    <div className={styles.container}>
      <Head>
        <title>Sevn News</title>
        <meta name="description" content="Sevn News" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {mainNews.map(news => <h1 key={news.id}>{news.title}</h1>)}
        </div>
        <div>
          <h3>
            {secondaryNews.map(news => <h2 key={news.id}>{news.title}</h2>)}
          </h3>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const mainNews = await fetch('http://localhost:5000/main-news').then(res => res.json())
  const secondaryNews = await fetch('http://localhost:5000/secondary-news').then(res => res.json())
  return {
    props: {
      mainNews,
      secondaryNews
    }
  }
}

export default Home
