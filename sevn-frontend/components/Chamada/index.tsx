import Link from 'next/link';
import styles from './Chamada.module.css'

interface IProps{
  title: string;
  category: string;
  id: number;
}

export default function Chamada({title, category, id}: IProps){
  const colors = {
    "Educação": "#24538B",
    "Economia": "#FF2D2D",
    "Diversidades": "#248B28"
  }
  type colorsCategory = keyof typeof colors;
  const color = colors[category as colorsCategory]
  return (
    <article className={styles.article}>
      <div style={{borderColor: color, backgroundColor: color}}/>
      <Link href={`/news/${id}`} >
        <a className={styles.link}>{title}</a>
        </Link>
    </article>
  )
}