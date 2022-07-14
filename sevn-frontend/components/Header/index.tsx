import { useRouter } from 'next/router'
import styles from './Header.module.css'


export default function Header(){
  const router = useRouter();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    router.push("/");
  }

  return (
    <header className={styles.header}>
      {
        router.pathname !== "/" ? 
        <button onClick={onClick} type="button">
          <img src="/arrow-left.svg" alt="Back Button"/>
        </button> 
        : null
      }
      <div>
        <h2>SEVN NEWS</h2>
      </div>
    </header>
  )
}