import Image from "next/image";
import Link from "next/link";
import { CategoryColors, colors } from "../../utils/colors";
import styles from './Headline.module.css'

interface Image{
  url: string;
  alt: string
}
interface IProps{
  title: string;
  category: string;
  id: number;
  image: Image | null;
}

export default function Headline({title, category, id, image}: IProps){
  
  const color = CategoryColors[category as colors]

  return (
    <Link href={`/news/${id}`}>
      <article className={styles.headline}>
        {image ? 
          <div>
            <Image 
            src={`http://localhost:5000/${image.url}`} 
            alt={image.alt} 
            layout='fill' 
            objectFit="cover" 
            className={styles.image}
            style={{borderRadius: '1rem'}} 
            />
          </div> 
          : null}
        <p style={{color: color}}>{category}</p>
          <a className={styles.title}>{title}</a>
      </article>
    </Link>
  )
}