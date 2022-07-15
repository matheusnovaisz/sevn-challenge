import Link from "next/link";
import { CategoryColors, colors } from "../../utils/colors";
import styles from './Headline.module.css'

interface IProps{
  title: string;
  category: string;
  id: number;
}

export default function Headline({title, category, id}: IProps){
  
  const color = CategoryColors[category as colors]

  return (
    <article className={styles.headline}>
      <p style={{color: color}}>{category}</p>
      <Link href={`/news/${id}`}>
        <a className={styles.title}>{title}</a>
      </Link>
    </article>
  )
}