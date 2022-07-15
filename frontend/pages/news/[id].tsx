import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { ParsedUrlQuery } from "querystring"
import Publicidade from "../../components/Publicidade";
import { Post } from "../../utils/interfaces/Post.interface";
import styles from "../../styles/News.module.css"
import { CategoryColors, colors } from "../../utils/colors";
import Image from "next/image";

interface IParams extends ParsedUrlQuery{
  id: string;
}

interface NewsPageProps {
  post: Post;
}

export default function NewsPage({post}: NewsPageProps){

  const color = CategoryColors[post.category as colors]

  const postDate = new Date(post.postedAt).toLocaleDateString('pt-br');
  const postTime = new Date(post.postedAt).toLocaleTimeString('pt-br', {hour: "2-digit", minute: "2-digit" })

  return (
    <main className={styles.container}>
      <div>
        <h6 style={{color}}>{post.category}</h6>
        <h1>{post.title}</h1>
      </div>
      <h2>{post.subtitle}</h2>
      <h5>{postDate} as {postTime}, Por: {post.author}</h5>
      <Publicidade />
      {post.image ? 
        <div className={styles.image}>
          <Image src={`http://localhost:5000/${post.image.url}`} alt={post.image.alt} layout='fill' objectFit="cover"/>
        </div>
      : null}
      <div className={styles.body}>
        {
          post.body
          .split(/\r?\n/)                       //Separa as quebras de linha do texto em paragráfos
          .map(p => p.trim())                   //Remove caracteres vazios no começo e fim do paragráfo
          .filter(element =>element)            //Remove parágrafos vazios
          .map((text, index) => <p key={`p-${index}`}>{text}</p> )
        }
      </div>
    </main>
  )
}

export const  getStaticPaths: GetStaticPaths = async () => {
  const mainNews = await fetch('http://localhost:5000/main-news').then(res => res.json())
  const secondaryNews = await fetch('http://localhost:5000/secondary-news').then(res => res.json())
  const paths = [...mainNews, ...secondaryNews].map((element) => ({params: {id: String(element.id)}}))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params} : GetStaticPropsContext) => {
  const {id} = params as IParams
  const post = await fetch(`http://localhost:5000/news/${id}`).then(res => res.json())
  return {
    props: {
      post
    }
  }
}