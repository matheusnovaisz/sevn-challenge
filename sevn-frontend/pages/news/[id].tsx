import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext } from "next"
import { ParsedUrlQuery } from "querystring"
import { Post } from "../../utils/interfaces/Post.interface";

interface IParams extends ParsedUrlQuery{
  id: string;
}

interface NewsPageProps {
  post: Post;
}

export default function NewsPage({post}: NewsPageProps){
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
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