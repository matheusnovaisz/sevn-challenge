import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Chamada from '../components/Chamada'
import Publicidade from '../components/Publicidade'
import styles from '../styles/Home.module.css'
import { Post } from '../utils/interfaces/Post.interface'

interface HomePageProps{
  mainNews: Post[],
  secondaryNews: Post[]
}

const Home: NextPage<HomePageProps> = ({mainNews, secondaryNews}) => {

  function groupByCategory(acc: Post[][], element: Post){
    const accIndex = acc.findIndex(newsByCategory => newsByCategory[0].category === element.category)
    if(accIndex < 0) acc.push([element])
    else acc[accIndex].push(element)
    return acc
  }

  function sortCategoryByLength(categoryA: Array<any>, categoryB: Array<any>){
    return categoryB.length - categoryA.length
  }

 
  return (
    <div className={styles.container}>
      <Head>
        <title>Sevn News</title>
        <meta name="description" content="Sevn News" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Publicidade />
        <div>
          {/* {mainNews.map(news => <h1 key={news.id}>{news.title}</h1>)} */}
        </div>
        <div className={styles.categories}>
          {secondaryNews
            .reduce(groupByCategory, [])
            .sort(sortCategoryByLength)
            .map(category => (
              <div key={`category-${category[0].category}`} className={styles.secondaryNews}>
                {category.map(news => <Chamada key={news.id} category={news.category} title={news.title} id={news.id}/>)}
              </div>
              ))}
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
