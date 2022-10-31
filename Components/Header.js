import React from 'react'
import styles from './Header.module.css'
import { AuthUserContext } from '../AuthUserContext'
import useFirstLetter from '../Hooks/useFirstLetter'
import useMedia from '../Hooks/useMedia'
import Menu from './Menu'
import LogoHeaderSVG from '../Assets/LogoHeaderSVG'

const Header = ({mailBox: {mailBox, setMailBox},reading, qtdeMensagens}) => {
  const {login, user} = React.useContext(AuthUserContext)
  const media = useMedia('(max-width: 720px)');
  const [mobileMenu, setMobileMenu] = React.useState(false)
  const firstLetter = useFirstLetter();
  const dataMailBox = React.useRef({
    cxentrada: true,
    favoritos: false,
    arquivados: false,
    lixeira: false
  })

  if(!login) return null
  
  if(media && !reading){
    return (
      <header className={`mainHeader ${styles.headerMobile}`}>
        <button className={styles.menuBtn} onClick={()=>setMobileMenu(!mobileMenu)}></button>
        <Menu setMailBox={setMailBox} setMobileMenu={setMobileMenu} qtdeMensagens={qtdeMensagens} mobileMenu={mobileMenu} media={media} mailBox={mailBox} dataMailBox={dataMailBox}/>     
        <div className={styles.logoName}>
          {firstLetter(user.displayName)}
        </div>
      </header>
    )
  }else{
    return (
      <>
        <header className={`${styles.header}`}>
          <span className={styles.logoHeader}><LogoHeaderSVG /></span>
          <div className={styles.logoName}>
            {firstLetter(user.displayName)}
          </div>
        </header>
        <Menu qtdeMensagens={qtdeMensagens} media={media} mailBox={mailBox} setMailBox={setMailBox} dataMailBox={dataMailBox}/>   
      </>
    )
  }
  
}

export default Header