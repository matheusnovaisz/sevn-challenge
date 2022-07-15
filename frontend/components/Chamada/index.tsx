import Link from 'next/link';
import { CategoryColors, colors } from '../../utils/colors';
import styles from './Chamada.module.css'

interface IProps{
  title: string;
  category: string;
  id: number;
}

export default function Chamada({title, category, id}: IProps){
  
  const color = CategoryColors[category as colors]
  
  return (
    <article className={styles.article}>
      <div style={{borderColor: color, backgroundColor: color}}/>
      <Link href={`/news/${id}`} >
        <a className={styles.link}>{title}</a>
        </Link>
    </article>
  )
}